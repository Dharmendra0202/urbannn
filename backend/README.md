# Urbannn Backend API

Complete backend API for Urbannn home services platform with Supabase database and Razorpay payment integration.

## Features

- 🔐 Authentication with Supabase (Phone OTP, Email/Password)
- 💳 Payment gateway integration with Razorpay
- 📦 Complete booking management system
- ⭐ Reviews and ratings
- 🎟️ Coupon and discount system
- 🔔 Notifications
- 🏠 User address management
- 👷 Service provider management
- 🔒 Row Level Security (RLS) enabled

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Payment**: Razorpay
- **Authentication**: Supabase Auth

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/buaernvuayjihhwsfdl
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `src/database/schema.sql`
4. Execute the SQL to create all tables
5. Copy and paste the contents of `src/database/seed.sql`
6. Execute to populate sample data

### 3. Get Supabase Keys

1. Go to **Project Settings** > **API**
2. Copy the following:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key

### 4. Setup Razorpay

1. Sign up at https://razorpay.com/
2. Go to **Settings** > **API Keys**
3. Generate Test/Live keys
4. Copy Key ID and Key Secret

### 5. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```env
PORT=3000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://buaernvuayjihhwsfdl.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# JWT
JWT_SECRET=your_random_secret_key_here
JWT_EXPIRES_IN=7d

# URLs
APP_URL=http://localhost:3000
FRONTEND_URL=exp://localhost:8081
```

### 6. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:3000

## API Endpoints

### Authentication

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login with phone/password
POST   /api/auth/send-otp        - Send OTP to phone
POST   /api/auth/verify-otp      - Verify OTP
POST   /api/auth/logout          - Logout user
```

### Users

```
GET    /api/users/profile        - Get user profile
PATCH  /api/users/profile        - Update profile
GET    /api/users/addresses      - Get all addresses
POST   /api/users/addresses      - Add new address
PATCH  /api/users/addresses/:id  - Update address
DELETE /api/users/addresses/:id  - Delete address
```

### Services

```
GET    /api/services/categories  - Get all categories
GET    /api/services             - Get all services
GET    /api/services/:id         - Get service by ID
GET    /api/services/slug/:slug  - Get service by slug
```

### Bookings

```
GET    /api/bookings             - Get user bookings
GET    /api/bookings/:id         - Get booking details
POST   /api/bookings             - Create new booking
PATCH  /api/bookings/:id/status  - Update booking status
POST   /api/bookings/:id/cancel  - Cancel booking
```

### Payments

```
POST   /api/payments/create-order - Create Razorpay order
POST   /api/payments/verify       - Verify payment
GET    /api/payments/:id          - Get payment details
POST   /api/payments/:id/refund   - Initiate refund
```

### Reviews

```
GET    /api/reviews/service/:id   - Get service reviews
GET    /api/reviews/provider/:id  - Get provider reviews
POST   /api/reviews               - Create review
```

### Coupons

```
GET    /api/coupons               - Get active coupons
POST   /api/coupons/validate      - Validate coupon code
```

### Notifications

```
GET    /api/notifications         - Get user notifications
PATCH  /api/notifications/:id/read - Mark as read
POST   /api/notifications/mark-all-read - Mark all as read
```

## Database Schema

### Main Tables

- `users` - User profiles
- `user_addresses` - User addresses
- `service_categories` - Service categories
- `services` - Available services
- `service_variants` - Service options/variants
- `service_providers` - Service professionals
- `provider_services` - Provider-service mapping
- `bookings` - Service bookings
- `booking_items` - Booking line items
- `payments` - Payment transactions
- `reviews` - User reviews
- `coupons` - Discount coupons
- `coupon_usage` - Coupon usage tracking
- `notifications` - User notifications

## Payment Flow

1. User creates a booking
2. Frontend calls `/api/payments/create-order` with booking_id and amount
3. Backend creates Razorpay order and returns order_id
4. Frontend shows Razorpay checkout
5. After payment, frontend calls `/api/payments/verify` with payment details
6. Backend verifies signature and updates booking status
7. Notification sent to user

## Testing

### Test with cURL

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919999999999",
    "password": "password123",
    "full_name": "Test User",
    "email": "test@example.com"
  }'

# Get services
curl http://localhost:3000/api/services

# Create booking (requires auth token)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "service_id": "650e8400-e29b-41d4-a716-446655440001",
    "address_id": "YOUR_ADDRESS_ID",
    "scheduled_date": "2024-03-20",
    "scheduled_time": "10:00:00"
  }'
```

## Security

- Row Level Security (RLS) enabled on all user tables
- JWT token authentication
- Rate limiting on API endpoints
- Helmet.js for security headers
- CORS configured
- Payment signature verification

## Deployment

### Deploy to Railway/Render/Heroku

1. Push code to GitHub
2. Connect repository to hosting platform
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform with production values.

## Support

For issues or questions, contact: support@urbannn.app
