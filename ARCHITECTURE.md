# 🏗️ Architecture Overview

Understanding how everything connects.

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     REACT NATIVE APP                         │
│                    (Expo / React Native)                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Screens    │  │  Components  │  │   lib/api    │     │
│  │  (app/*)     │  │ (components/)│  │  (API calls) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │
                             │ HTTP/REST API
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    NODE.JS BACKEND                           │
│                   (Express Server)                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    API Routes                         │  │
│  │  /api/auth  /api/users  /api/services  /api/bookings│  │
│  │  /api/payments  /api/reviews  /api/coupons          │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                                      │             │
│         │                                      │             │
│  ┌──────▼──────┐                      ┌───────▼──────┐     │
│  │  Supabase   │                      │  Razorpay    │     │
│  │   Client    │                      │   Client     │     │
│  └──────┬──────┘                      └───────┬──────┘     │
│         │                                      │             │
└─────────┼──────────────────────────────────────┼─────────────┘
          │                                      │
          │                                      │
┌─────────▼──────────┐              ┌───────────▼──────────┐
│   SUPABASE         │              │   RAZORPAY           │
│   (PostgreSQL)     │              │   (Payment Gateway)  │
│                    │              │                      │
│  • Users           │              │  • Orders            │
│  • Services        │              │  • Payments          │
│  • Bookings        │              │  • Refunds           │
│  • Payments        │              │                      │
│  • Reviews         │              │                      │
└────────────────────┘              └──────────────────────┘
```

## 🔄 Data Flow

### 1. User Registration Flow

```
User enters phone → App calls /api/auth/send-otp
                 ↓
Backend calls Supabase Auth → Supabase sends OTP
                 ↓
User enters OTP → App calls /api/auth/verify-otp
                 ↓
Backend verifies → Creates user in database
                 ↓
Returns JWT token → App stores token
                 ↓
User is logged in ✅
```

### 2. Browse Services Flow

```
App loads → Calls /api/services
         ↓
Backend queries Supabase → Gets services from database
         ↓
Returns services → App displays on home screen
         ↓
User sees services ✅
```

### 3. Create Booking Flow

```
User selects service → Fills booking form
                    ↓
App calls /api/bookings (with auth token)
                    ↓
Backend validates → Creates booking in database
                    ↓
Returns booking ID → App shows confirmation
                    ↓
Booking created ✅
```

### 4. Payment Flow

```
User confirms booking → App calls /api/payments/create-order
                     ↓
Backend calls Razorpay → Creates order
                     ↓
Returns order_id → App shows Razorpay checkout
                     ↓
User pays → Razorpay processes payment
                     ↓
App calls /api/payments/verify → Backend verifies signature
                     ↓
Updates booking status → Sends notification
                     ↓
Payment complete ✅
```

## 📁 File Structure

```
urbannn/
│
├── app/                          # React Native Screens
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx           # Home screen
│   │   ├── bookings.tsx        # Bookings screen
│   │   ├── categories.tsx      # Categories screen
│   │   └── profile.tsx         # Profile screen
│   │
│   ├── services/                # Service screens
│   ├── cleaning/                # Cleaning services
│   ├── repair/                  # Repair services
│   └── offers/                  # Offers screens
│
├── components/                   # Reusable components
│   ├── HorizontalCard.tsx
│   ├── SectionHeader.tsx
│   └── ...
│
├── lib/                         # Utilities & API
│   ├── api.ts                  # Backend API client
│   └── supabase.ts             # Supabase config
│
├── backend/                     # Node.js Backend
│   ├── src/
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── service.routes.js
│   │   │   ├── booking.routes.js
│   │   │   ├── payment.routes.js
│   │   │   ├── review.routes.js
│   │   │   ├── coupon.routes.js
│   │   │   └── notification.routes.js
│   │   │
│   │   ├── config/             # Configuration
│   │   │   ├── supabase.js
│   │   │   └── razorpay.js
│   │   │
│   │   ├── middleware/         # Middleware
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── database/           # Database
│   │   │   ├── schema.sql     # Database schema
│   │   │   └── seed.sql       # Sample data
│   │   │
│   │   └── server.js           # Express server
│   │
│   ├── .env                    # Environment variables
│   └── package.json
│
└── assets/                      # Images & animations
```

## 🔐 Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ 1. Enter phone
       ▼
┌─────────────┐
│   App       │
└──────┬──────┘
       │
       │ 2. POST /api/auth/send-otp
       ▼
┌─────────────┐
│  Backend    │
└──────┬──────┘
       │
       │ 3. Call Supabase Auth
       ▼
┌─────────────┐
│  Supabase   │
└──────┬──────┘
       │
       │ 4. Send OTP via SMS
       ▼
┌─────────────┐
│   User      │ Receives OTP
└──────┬──────┘
       │
       │ 5. Enter OTP
       ▼
┌─────────────┐
│   App       │
└──────┬──────┘
       │
       │ 6. POST /api/auth/verify-otp
       ▼
┌─────────────┐
│  Backend    │
└──────┬──────┘
       │
       │ 7. Verify with Supabase
       ▼
┌─────────────┐
│  Supabase   │
└──────┬──────┘
       │
       │ 8. Return JWT token
       ▼
┌─────────────┐
│   App       │ Stores token
└──────┬──────┘
       │
       │ 9. All future requests include token
       ▼
    Authenticated ✅
```

## 💳 Payment Flow

```
┌─────────────┐
│   User      │ Confirms booking
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   App       │ POST /api/payments/create-order
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Backend    │ Creates Razorpay order
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Razorpay   │ Returns order_id
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   App       │ Shows Razorpay checkout
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   User      │ Enters card details
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Razorpay   │ Processes payment
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   App       │ POST /api/payments/verify
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Backend    │ Verifies signature
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Supabase   │ Updates booking & payment
└──────┬──────┘
       │
       ▼
    Payment Complete ✅
```

## 🗄️ Database Schema

### Core Tables

```
users
├── id (UUID, PK)
├── phone (VARCHAR)
├── full_name (VARCHAR)
├── email (VARCHAR)
└── created_at (TIMESTAMP)

user_addresses
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── address_line1 (VARCHAR)
├── city (VARCHAR)
├── pincode (VARCHAR)
└── is_default (BOOLEAN)

services
├── id (UUID, PK)
├── category_id (UUID, FK → service_categories)
├── name (VARCHAR)
├── base_price (DECIMAL)
├── rating (DECIMAL)
└── is_active (BOOLEAN)

bookings
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── service_id (UUID, FK → services)
├── provider_id (UUID, FK → service_providers)
├── scheduled_date (DATE)
├── total_amount (DECIMAL)
├── status (VARCHAR)
└── payment_status (VARCHAR)

payments
├── id (UUID, PK)
├── booking_id (UUID, FK → bookings)
├── razorpay_order_id (VARCHAR)
├── razorpay_payment_id (VARCHAR)
├── amount (DECIMAL)
└── status (VARCHAR)
```

## 🔒 Security Layers

```
┌─────────────────────────────────────────┐
│  1. HTTPS/TLS Encryption                │
│     All data encrypted in transit       │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  2. CORS Protection                     │
│     Only allowed origins can access     │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  3. Rate Limiting                       │
│     Max 100 requests per 15 minutes     │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  4. JWT Authentication                  │
│     Valid token required for API        │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  5. Row Level Security (RLS)            │
│     Users can only see their own data   │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  6. Payment Signature Verification      │
│     Razorpay signatures validated       │
└─────────────────────────────────────────┘
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              PRODUCTION SETUP                    │
└─────────────────────────────────────────────────┘

React Native App (Mobile)
    │
    │ HTTPS
    ▼
┌─────────────────┐
│  CDN / Cloudflare│ (Optional)
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Load Balancer  │ (Optional for scaling)
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Backend Server │ (Railway/Render/Heroku)
│  Node.js/Express│
└────────┬─────────┘
         │
         ├──────────────┬──────────────┐
         │              │              │
         ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐
│  Supabase    │ │ Razorpay │ │  Redis   │
│  (Database)  │ │ (Payment)│ │ (Cache)  │
└──────────────┘ └──────────┘ └──────────┘
```

## 📊 Request/Response Flow

### Example: Get Services

```
1. User opens app
   ↓
2. App calls: GET /api/services
   Headers: { Authorization: "Bearer token" }
   ↓
3. Backend receives request
   ↓
4. Auth middleware validates token
   ↓
5. Route handler queries Supabase
   Query: SELECT * FROM services WHERE is_active = true
   ↓
6. Supabase returns data
   ↓
7. Backend formats response
   ↓
8. Returns JSON:
   {
     "services": [
       {
         "id": "...",
         "name": "Home Deep Cleaning",
         "price": 2499,
         ...
       }
     ]
   }
   ↓
9. App displays services
```

## 🎯 Key Components

### Frontend (React Native)
- **Expo Router**: File-based navigation
- **Moti**: Animations
- **Supabase Client**: Direct database access for auth
- **API Client**: HTTP requests to backend

### Backend (Node.js)
- **Express**: Web framework
- **Supabase JS**: Database client
- **Razorpay SDK**: Payment processing
- **JWT**: Token authentication

### Database (Supabase/PostgreSQL)
- **Tables**: 15+ tables for all features
- **RLS**: Row-level security
- **Triggers**: Auto-update ratings, timestamps
- **Functions**: Business logic

### External Services
- **Razorpay**: Payment gateway
- **Twilio** (optional): SMS for OTP
- **Firebase** (optional): Push notifications

## 📈 Scalability

### Current Setup (Good for 0-10K users)
- Single backend server
- Supabase free tier
- No caching

### Medium Scale (10K-100K users)
- Multiple backend instances
- Supabase Pro tier
- Redis caching
- CDN for static assets

### Large Scale (100K+ users)
- Load balancer
- Auto-scaling backend
- Database read replicas
- Microservices architecture
- Message queue (RabbitMQ/Redis)

---

This architecture provides a solid foundation that can scale as your app grows!
