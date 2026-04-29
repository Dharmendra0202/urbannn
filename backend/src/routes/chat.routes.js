const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Get or create conversation for a user
router.post('/conversations', async (req, res) => {
  try {
    const { user_id, user_name, user_email } = req.body;

    if (!user_id || !user_name) {
      return res.status(400).json({ error: 'user_id and user_name are required' });
    }

    // Check if user already has an active conversation
    const { data: existing, error: fetchError } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existing && !fetchError) {
      return res.json({ conversation: existing });
    }

    // Create new conversation
    const { data: newConv, error: createError } = await supabase
      .from('chat_conversations')
      .insert({
        user_id,
        user_name,
        user_email: user_email || null,
        status: 'active',
      })
      .select()
      .single();

    if (createError) {
      console.error('Create conversation error:', createError);
      return res.status(500).json({ error: 'Failed to create conversation' });
    }

    // Send welcome message
    await supabase.from('chat_messages').insert({
      conversation_id: newConv.id,
      sender_type: 'system',
      sender_name: 'Urbannn Support',
      message: `Hi ${user_name}! 👋 Welcome to Urbannn Support. How can we help you today?`,
    });

    res.json({ conversation: newConv });
  } catch (error) {
    console.error('Conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages for a conversation
router.get('/conversations/:conversationId/messages', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, before } = req.query;

    let query = supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (before) {
      query = query.lt('created_at', before);
    }

    const { data: messages, error } = await query;

    if (error) {
      console.error('Fetch messages error:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }

    // Reverse to show oldest first
    res.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send a message
router.post('/conversations/:conversationId/messages', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { sender_type, sender_name, message, image_url } = req.body;

    if (!sender_type || !sender_name || !message) {
      return res.status(400).json({ 
        error: 'sender_type, sender_name, and message are required' 
      });
    }

    if (!['user', 'support', 'system'].includes(sender_type)) {
      return res.status(400).json({ 
        error: 'sender_type must be user, support, or system' 
      });
    }

    const { data: newMessage, error } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender_type,
        sender_name,
        message: message.trim(),
        image_url: image_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Send message error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    res.json({ message: newMessage });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark messages as read
router.patch('/conversations/:conversationId/read', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { read_by } = req.body; // 'user' or 'support'

    if (!read_by || !['user', 'support'].includes(read_by)) {
      return res.status(400).json({ error: 'read_by must be user or support' });
    }

    const updateField = read_by === 'user' ? 'read_by_user' : 'read_by_support';
    const senderType = read_by === 'user' ? 'support' : 'user';

    const { error } = await supabase
      .from('chat_messages')
      .update({ [updateField]: true })
      .eq('conversation_id', conversationId)
      .eq('sender_type', senderType)
      .eq(updateField, false);

    if (error) {
      console.error('Mark read error:', error);
      return res.status(500).json({ error: 'Failed to mark as read' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get unread count for user
router.get('/conversations/:conversationId/unread', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { for_user = 'true' } = req.query;

    const { data, error } = await supabase.rpc('get_unread_count', {
      conv_id: conversationId,
      for_user: for_user === 'true',
    });

    if (error) {
      console.error('Unread count error:', error);
      return res.status(500).json({ error: 'Failed to get unread count' });
    }

    res.json({ unread_count: data || 0 });
  } catch (error) {
    console.error('Unread count error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Close conversation
router.patch('/conversations/:conversationId/close', async (req, res) => {
  try {
    const { conversationId } = req.params;

    const { error } = await supabase
      .from('chat_conversations')
      .update({ status: 'closed', updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    if (error) {
      console.error('Close conversation error:', error);
      return res.status(500).json({ error: 'Failed to close conversation' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Close conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
