import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BACKEND_URL = "https://urbannn-server.vercel.app";
const GUEST_USER_ID = "00000000-0000-0000-0000-000000000001";

type Message = {
  id: string;
  conversation_id: string;
  sender_type: "user" | "support" | "system";
  sender_name: string;
  message: string;
  image_url: string | null;
  created_at: string;
};

type Conversation = {
  id: string;
  user_id: string;
  user_name: string;
  status: string;
  created_at: string;
};

export default function LiveChatScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    try {
      setLoading(true);

      // Get or create conversation
      const convResponse = await fetch(`${BACKEND_URL}/api/chat/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: GUEST_USER_ID,
          user_name: "Guest User",
          user_email: "guest@urbannn.app",
        }),
      });

      if (!convResponse.ok) {
        const errorText = await convResponse.text().catch(() => "Unknown error");
        console.error("Chat API error:", convResponse.status, errorText);
        throw new Error("Chat service is not available yet. Please deploy backend first.");
      }

      const { conversation: conv } = await convResponse.json();
      setConversation(conv);

      // Load messages
      await loadMessages(conv.id);
    } catch (error) {
      console.error("Initialize chat error:", error);
      Alert.alert(
        "Chat Not Available", 
        "The chat service needs to be deployed first. Please follow these steps:\n\n1. Deploy backend with chat routes\n2. Run SQL schema in Supabase\n3. Restart the app\n\nSee CHAT_SETUP_GUIDE.md for details.",
        [
          { text: "Go Back", onPress: () => router.back() },
          { text: "OK" }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/chat/conversations/${conversationId}/messages?limit=50`
      );

      if (!response.ok) {
        throw new Error("Failed to load messages");
      }

      const { messages: msgs } = await response.json();
      setMessages(msgs);

      // Mark messages as read
      await fetch(
        `${BACKEND_URL}/api/chat/conversations/${conversationId}/read`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read_by: "user" }),
        }
      );

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Load messages error:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !conversation) return;

    const messageText = inputText.trim();
    setInputText("");
    setSending(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/chat/conversations/${conversation.id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_type: "user",
            sender_name: "Guest User",
            message: messageText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const { message: newMessage } = await response.json();
      setMessages((prev) => [...prev, newMessage]);

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Simulate support response after 2 seconds (for demo)
      setTimeout(() => {
        simulateSupportResponse();
      }, 2000);
    } catch (error) {
      console.error("Send message error:", error);
      Alert.alert("Error", "Failed to send message. Please try again.");
      setInputText(messageText); // Restore message
    } finally {
      setSending(false);
    }
  };

  const simulateSupportResponse = async () => {
    if (!conversation) return;

    const responses = [
      "Thank you for contacting us! A support agent will be with you shortly.",
      "I understand your concern. Let me help you with that.",
      "Could you please provide more details about your issue?",
      "We're looking into this for you. Please hold on.",
      "Is there anything else I can help you with?",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/chat/conversations/${conversation.id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_type: "support",
            sender_name: "Support Agent",
            message: randomResponse,
          }),
        }
      );

      if (response.ok) {
        const { message: newMessage } = await response.json();
        setMessages((prev) => [...prev, newMessage]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error("Support response error:", error);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender_type === "user";
    const isSystem = item.sender_type === "system";

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessage}>{item.message}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.supportMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.supportBubble,
          ]}
        >
          {!isUser && (
            <Text style={styles.senderName}>{item.sender_name}</Text>
          )}
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userMessageText : styles.supportMessageText,
            ]}
          >
            {item.message}
          </Text>
          <Text
            style={[
              styles.messageTime,
              isUser ? styles.userMessageTime : styles.supportMessageTime,
            ]}
          >
            {formatTime(item.created_at)}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingText}>Loading chat...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerAvatar}>
            <Ionicons name="headset" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Support Team</Text>
            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add-circle-outline" size={24} color="#7C3AED" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || sending) && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || sending}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="send" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#7C3AED",
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  onlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 4,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  onlineText: {
    fontSize: 11,
    color: "#E9D5FF",
  },
  headerButton: {
    padding: 4,
  },
  flex: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  supportMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: "#7C3AED",
    borderBottomRightRadius: 4,
  },
  supportBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  senderName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7C3AED",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  supportMessageText: {
    color: "#0F172A",
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  userMessageTime: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
  supportMessageTime: {
    color: "#94A3B8",
  },
  systemMessageContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  systemMessage: {
    fontSize: 12,
    color: "#64748B",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#CBD5E1",
  },
});
