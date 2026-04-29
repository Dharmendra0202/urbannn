# 🗺️ Chat Feature Navigation Map

## Where to Find Chat Support in the App

```
┌─────────────────────────────────────────────────────────────┐
│                     URBANNN APP                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │     Bottom Tab Navigation (4 tabs)      │
        ├─────────┬─────────┬─────────┬──────────┤
        │  Home   │ Bookings│ Offers  │ Profile  │ ◄── TAP HERE
        └─────────┴─────────┴─────────┴──────────┘
                                            │
                                            ▼
        ┌───────────────────────────────────────────────┐
        │           PROFILE SCREEN                      │
        ├───────────────────────────────────────────────┤
        │  👤 Guest User                                │
        │  📧 guest@urbannn.app                         │
        │                                               │
        │  📊 Stats: Upcoming | Completed | Spent      │
        │                                               │
        │  ⚡ Quick Actions:                            │
        │  ┌─────────────────────────────────────────┐ │
        │  │ 🛡️  Admin Dashboard                     │ │
        │  │ 📅 My Bookings                          │ │
        │  │ 📍 Saved Addresses                      │ │
        │  │ 💳 Payment Methods                      │ │
        │  │ 🎧 Help & Support  ◄── TAP THIS!       │ │
        │  │ 🎁 Special Offers                       │ │
        │  └─────────────────────────────────────────┘ │
        └───────────────────────────────────────────────┘
                              │
                              ▼
        ┌───────────────────────────────────────────────┐
        │        SUPPORT HUB SCREEN                     │
        │        (app/support/index.tsx)                │
        ├───────────────────────────────────────────────┤
        │  🎧 Need Help?                                │
        │  Choose your preferred way to reach us        │
        │                                               │
        │  📞 Contact Us:                               │
        │  ┌─────────────────────────────────────────┐ │
        │  │ 💬 Live Chat          [Online] ◄── TAP! │ │
        │  │ Chat with our support team              │ │
        │  ├─────────────────────────────────────────┤ │
        │  │ 📞 Call Us                              │ │
        │  │ +91 9999999999                          │ │
        │  ├─────────────────────────────────────────┤ │
        │  │ 📧 Email Us                             │ │
        │  │ support@urbannn.app                     │ │
        │  └─────────────────────────────────────────┘ │
        │                                               │
        │  ❓ Frequently Asked Questions:               │
        │  • How do I book a service?                   │
        │  • Can I cancel my booking?                   │
        │  • What payment methods are accepted?         │
        │  • How do I track my service provider?        │
        │  • What if I'm not satisfied?                 │
        │                                               │
        │  💡 Quick Tips:                               │
        │  • Have your booking number ready             │
        │  • Response time: Less than 5 minutes         │
        └───────────────────────────────────────────────┘
                              │
                              ▼
        ┌───────────────────────────────────────────────┐
        │         LIVE CHAT SCREEN                      │
        │         (app/support/chat.tsx)                │
        ├───────────────────────────────────────────────┤
        │  ◄ 🎧 Support Team        [Online] ⋮         │
        ├───────────────────────────────────────────────┤
        │                                               │
        │  ┌─────────────────────────────────────────┐ │
        │  │ Hi Guest User! 👋                       │ │
        │  │ Welcome to Urbannn Support.             │ │
        │  │ How can we help you today?              │ │
        │  │                            10:30 AM     │ │
        │  └─────────────────────────────────────────┘ │
        │                                               │
        │                  ┌──────────────────────────┐ │
        │                  │ Hello, I need help       │ │
        │                  │                10:31 AM │ │
        │                  └──────────────────────────┘ │
        │                                               │
        │  ┌─────────────────────────────────────────┐ │
        │  │ Thank you for contacting us!            │ │
        │  │ A support agent will be with            │ │
        │  │ you shortly.                            │ │
        │  │                            10:31 AM     │ │
        │  └─────────────────────────────────────────┘ │
        │                                               │
        │                  ┌──────────────────────────┐ │
        │                  │ I have a question about  │ │
        │                  │ my booking               │ │
        │                  │                10:32 AM │ │
        │                  └──────────────────────────┘ │
        │                                               │
        ├───────────────────────────────────────────────┤
        │  [+]  Type your message...           [Send]  │
        └───────────────────────────────────────────────┘
```

---

## 🎯 Key Locations

### 1. Entry Point: Profile Tab
**File**: `app/(tabs)/profile.tsx`
**Line**: ~329-334 (Quick Actions array)

```typescript
{
  key: "support",
  title: "Help & Support",
  subtitle: "Call, chat, or raise a ticket",
  icon: "headset-outline",
  iconBg: "#FCE7F3",
}
```

### 2. Support Hub Screen
**File**: `app/support/index.tsx`
**Route**: `/support`

Features:
- Live Chat button → Opens chat screen
- Call button → Opens phone dialer
- Email button → Opens email client
- FAQ accordion
- Quick tips

### 3. Live Chat Screen
**File**: `app/support/chat.tsx`
**Route**: `/support/chat`

Features:
- Real-time message UI
- Send/receive messages
- Message history
- Auto-scroll
- Timestamps

---

## 🔄 User Journey

```
1. User opens app
   ↓
2. Taps "Profile" tab (bottom navigation)
   ↓
3. Scrolls to "Quick Actions" section
   ↓
4. Taps "Help & Support" card
   ↓
5. Sees Support Hub with 3 options
   ↓
6. Taps "Live Chat" (with green "Online" badge)
   ↓
7. Chat screen opens with welcome message
   ↓
8. User types message and taps send
   ↓
9. Message appears in chat
   ↓
10. Support response appears after 2 seconds
    ↓
11. Conversation continues...
```

---

## 📱 Visual Hierarchy

```
App Root
└── Tabs Layout
    └── Profile Tab (/profile)
        └── Quick Actions Section
            └── Help & Support Card
                └── Support Hub (/support)
                    ├── Live Chat Button
                    │   └── Chat Screen (/support/chat)
                    ├── Call Button
                    │   └── Phone Dialer
                    ├── Email Button
                    │   └── Email Client
                    └── FAQ Section
                        └── Expandable Answers
```

---

## 🎨 UI Components Used

### Profile Screen
- `TouchableOpacity` - Quick action cards
- `Ionicons` - Icons (headset-outline)
- `LinearGradient` - Hero card background

### Support Hub
- `LinearGradient` - Hero card
- `TouchableOpacity` - Contact cards
- `Ionicons` - Icons (chatbubbles, call, mail)
- `ScrollView` - Scrollable content
- Expandable FAQ cards

### Chat Screen
- `FlatList` - Message list
- `KeyboardAvoidingView` - Input handling
- `TextInput` - Message input
- `TouchableOpacity` - Send button
- Message bubbles (user vs support)

---

## 🔗 Navigation Flow

```typescript
// From Profile to Support Hub
router.push("/support");

// From Support Hub to Chat
router.push("/support/chat");

// Back navigation
router.back();
```

---

## 🎯 Quick Access Points

Users can access support from:

1. **Profile Tab** → Help & Support → Live Chat
2. **Direct URL**: `urbannn://support/chat` (deep link)
3. **Future**: Notification → Tap → Opens chat

---

## 📊 Screen Breakdown

| Screen | File | Route | Purpose |
|--------|------|-------|---------|
| Profile | `app/(tabs)/profile.tsx` | `/profile` | Entry point |
| Support Hub | `app/support/index.tsx` | `/support` | Support options |
| Live Chat | `app/support/chat.tsx` | `/support/chat` | Messaging |

---

## 🎉 That's It!

The chat feature is integrated into your existing app structure. Users can easily find and access it from the Profile tab's Quick Actions section.

**Most Important Path:**
```
Profile Tab → Help & Support → Live Chat
```

This is where your users will go when they need help! 🚀
