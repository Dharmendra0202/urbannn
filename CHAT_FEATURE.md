# 💬 In-App Chat/Support System

## ✅ What's Been Built (Option A - Basic Chat)

### Frontend (React Native)
1. **Support Hub Screen** (`app/support/index.tsx`)
   - Live Chat button
   - Call Support button
   - Email Support button
   - FAQ section with expandable answers
   - Quick tips section

2. **Live Chat Screen** (`app/support/chat.tsx`)
   - Real-time message UI
   - User and support message bubbles
   - System messages
   - Message timestamps
   - Send message functionality
   - Auto-scroll to latest message
   - Simulated support responses (for demo)

### Backend (Node.js + Express)
3. **Chat API Routes** (`backend/src/routes/chat.routes.js`)
   - `POST /api/chat/conversations` - Get or create conversation
   - `GET /api/chat/conversations/:id/messages` - Load messages
   - `POST /api/chat/conversations/:id/messages` - Send message
   - `PATCH /api/chat/conversations/:id/read` - Mark as read
   - `GET /api/chat/conversations/:id/unread` - Get unread count
   - `PATCH /api/chat/conversations/:id/close` - Close conversation

### Database (Supabase)
4. **Database Schema** (`backend/database/chat-schema.sql`)
   - `chat_conversations` table - Store conversations
   - `chat_messages` table - Store messages
   - Indexes for performance
   - RLS policies for security
   - Triggers for auto-updating timestamps
   - Function for unread count

## 🚀 How to Use

### Step 1: Set Up Database
1. Open Supabase SQL Editor
2. Run the SQL from `backend/database/chat-schema.sql`
3. Verify tables are created

### Step 2: Deploy Backend
```bash
cd backend
git add .
git commit -m "Add chat support system"
git push
```

Backend will auto-deploy to Vercel.

### Step 3: Test in App
1. Open app in Expo Go
2. Go to Profile tab
3. Tap "Help & Support"
4. Tap "Live Chat"
5. Send a message
6. See simulated support response

## 📱 User Flow

```
Profile Screen
    ↓
Help & Support (Quick Action)
    ↓
Support Hub Screen
    ├── Live Chat → Chat Screen
    ├── Call Support → Phone Dialer
    ├── Email Support → Email Client
    └── FAQs → Expandable Answers
```

## 🎯 What Works Now

✅ Create conversation for user
✅ Send messages
✅ Receive messages
✅ Display message history
✅ System messages (welcome)
✅ Message timestamps
✅ Auto-scroll to latest
✅ Mark messages as read
✅ Simulated support responses

## 🔜 What's Next (Future Enhancements)

### Phase 2: Real-Time Features
- [ ] Supabase Realtime subscriptions
- [ ] Live message updates (no refresh needed)
- [ ] Typing indicators
- [ ] Online/offline status

### Phase 3: Rich Features
- [ ] Image sharing
- [ ] File attachments
- [ ] Voice messages
- [ ] Message reactions (👍, ❤️)

### Phase 4: Admin Panel
- [ ] Admin chat dashboard
- [ ] View all conversations
- [ ] Assign to support agents
- [ ] Canned responses
- [ ] Chat analytics

### Phase 5: Notifications
- [ ] Push notifications for new messages
- [ ] Unread message badge on profile
- [ ] Email notifications
- [ ] SMS notifications

## 🛠️ Technical Details

### API Endpoints

**Base URL**: `https://urbannn-server.vercel.app`

#### Create/Get Conversation
```http
POST /api/chat/conversations
Content-Type: application/json

{
  "user_id": "uuid",
  "user_name": "John Doe",
  "user_email": "john@example.com"
}
```

#### Send Message
```http
POST /api/chat/conversations/:conversationId/messages
Content-Type: application/json

{
  "sender_type": "user",
  "sender_name": "John Doe",
  "message": "Hello, I need help"
}
```

#### Load Messages
```http
GET /api/chat/conversations/:conversationId/messages?limit=50
```

### Database Schema

**chat_conversations**
- `id` - UUID primary key
- `user_id` - UUID of user
- `user_name` - Display name
- `user_email` - Email (optional)
- `status` - active/closed/waiting
- `last_message` - Preview text
- `last_message_at` - Timestamp
- `created_at` - Created timestamp
- `updated_at` - Updated timestamp

**chat_messages**
- `id` - UUID primary key
- `conversation_id` - Foreign key
- `sender_type` - user/support/system
- `sender_name` - Display name
- `message` - Message text
- `image_url` - Optional image
- `read_by_user` - Boolean
- `read_by_support` - Boolean
- `created_at` - Timestamp

## 🎨 UI Components

### Support Hub
- Hero card with gradient
- Contact cards (Chat, Call, Email)
- FAQ accordion
- Quick tips section

### Chat Screen
- Header with online status
- Message bubbles (user vs support)
- System messages (centered)
- Input with send button
- Attach button (placeholder)

## 📊 Current Limitations

1. **No Real-Time Updates**: Messages don't update automatically (need to refresh)
2. **Simulated Responses**: Support responses are fake (for demo)
3. **No Image Sharing**: Attach button is placeholder
4. **No Push Notifications**: No alerts for new messages
5. **Guest User Only**: Uses hardcoded guest user ID

## 🔧 Configuration

### Environment Variables (Backend)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
```

### Constants (Frontend)
```typescript
// app/support/chat.tsx
const BACKEND_URL = "https://urbannn-server.vercel.app";
const GUEST_USER_ID = "00000000-0000-0000-0000-000000000001";
```

## 🐛 Troubleshooting

### Messages not sending?
- Check backend is deployed
- Verify Supabase tables exist
- Check network connection
- Look at console logs

### Database errors?
- Run SQL schema in Supabase
- Check RLS policies
- Verify service key is set

### Navigation not working?
- Check route exists in `app/support/`
- Verify import paths
- Restart Expo dev server

## 📈 Metrics to Track

Once live, monitor:
- Total conversations created
- Messages sent per day
- Average response time
- User satisfaction ratings
- Most common questions (for FAQ)

## 🎉 Success!

You now have a working chat support system! Users can:
1. Access support from profile
2. Start a conversation
3. Send and receive messages
4. View message history
5. Get instant help

Next step: Deploy backend and test in production APK!
