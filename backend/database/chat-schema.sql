-- Chat Support System Schema
-- Run this in Supabase SQL Editor

-- 1. Chat Conversations Table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'waiting')),
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'support', 'system')),
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  image_url TEXT,
  read_by_user BOOLEAN DEFAULT FALSE,
  read_by_support BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON chat_conversations(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON chat_messages(created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - Allow all for now (we'll refine later)
CREATE POLICY "Allow all operations on conversations" ON chat_conversations FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON chat_messages FOR ALL USING (true);

-- 6. Function to update conversation timestamp
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chat_conversations
  SET 
    last_message = NEW.message,
    last_message_at = NEW.created_at,
    updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger to auto-update conversation on new message
DROP TRIGGER IF EXISTS trigger_update_conversation ON chat_messages;
CREATE TRIGGER trigger_update_conversation
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();

-- 8. Function to get unread count
CREATE OR REPLACE FUNCTION get_unread_count(conv_id UUID, for_user BOOLEAN)
RETURNS INTEGER AS $$
BEGIN
  IF for_user THEN
    RETURN (
      SELECT COUNT(*)
      FROM chat_messages
      WHERE conversation_id = conv_id
        AND sender_type = 'support'
        AND read_by_user = FALSE
    );
  ELSE
    RETURN (
      SELECT COUNT(*)
      FROM chat_messages
      WHERE conversation_id = conv_id
        AND sender_type = 'user'
        AND read_by_support = FALSE
    );
  END IF;
END;
$$ LANGUAGE plpgsql;
