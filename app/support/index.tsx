import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SUPPORT_PHONE = "+919999999999";
const SUPPORT_EMAIL = "support@urbannn.app";

const faqs = [
  {
    id: "1",
    question: "How do I book a service?",
    answer: "Browse services on the home screen, select your desired service, choose a time slot, and confirm your booking.",
  },
  {
    id: "2",
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel bookings from the 'My Bookings' section. Cancellation charges may apply based on timing.",
  },
  {
    id: "3",
    question: "What payment methods are accepted?",
    answer: "We accept UPI, cards, and cash on delivery. Online payments are processed securely through Razorpay.",
  },
  {
    id: "4",
    question: "How do I track my service provider?",
    answer: "Once assigned, you'll receive notifications with provider details and estimated arrival time.",
  },
  {
    id: "5",
    question: "What if I'm not satisfied with the service?",
    answer: "Contact us immediately through chat or call. We offer a satisfaction guarantee and will resolve any issues.",
  },
];

export default function SupportHubScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null);

  const handleCall = async () => {
    try {
      const canOpen = await Linking.canOpenURL(`tel:${SUPPORT_PHONE}`);
      if (canOpen) {
        await Linking.openURL(`tel:${SUPPORT_PHONE}`);
      } else {
        Alert.alert("Unable to call", "Phone dialer is not available.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open phone dialer.");
    }
  };

  const handleEmail = async () => {
    try {
      const canOpen = await Linking.canOpenURL(`mailto:${SUPPORT_EMAIL}`);
      if (canOpen) {
        await Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
      } else {
        Alert.alert("Unable to email", "Email client is not available.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open email client.");
    }
  };

  const handleLiveChat = () => {
    router.push("/support/chat" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubtitle}>We're here to help 24/7</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <LinearGradient
          colors={["#7C3AED", "#A78BFA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Ionicons name="headset" size={48} color="#FFFFFF" />
          <Text style={styles.heroTitle}>Need Help?</Text>
          <Text style={styles.heroSubtitle}>
            Choose your preferred way to reach us
          </Text>
        </LinearGradient>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleLiveChat}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: "#DBEAFE" }]}>
              <Ionicons name="chatbubbles" size={24} color="#1E40AF" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactSubtitle}>
                Chat with our support team
              </Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Online</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: "#D1FAE5" }]}>
              <Ionicons name="call" size={24} color="#065F46" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Call Us</Text>
              <Text style={styles.contactSubtitle}>{SUPPORT_PHONE}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleEmail}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="mail" size={24} color="#92400E" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Email Us</Text>
              <Text style={styles.contactSubtitle}>{SUPPORT_EMAIL}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {faqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;

            return (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqCard}
                onPress={() => setExpandedFaq(isExpanded ? null : faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#7C3AED"
                  />
                </View>
                {isExpanded && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={20} color="#F59E0B" />
            <Text style={styles.tipText}>
              For faster support, have your booking number ready when contacting us.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="time" size={20} color="#10B981" />
            <Text style={styles.tipText}>
              Average response time: Less than 5 minutes during business hours.
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    padding: 4,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  heroCard: {
    margin: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#E9D5FF",
    marginTop: 6,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  contactContent: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  contactSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  liveText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#065F46",
  },
  faqCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 12,
    lineHeight: 20,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
});
