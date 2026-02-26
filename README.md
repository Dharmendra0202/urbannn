# Urbannn - Home Services App

A full-stack home services booking application built with React Native (Expo), Node.js, and Supabase.

## Features

- 🏠 Browse home services (cleaning, repairs, beauty, etc.)
- 📅 Real-time booking system
- 💳 Payment integration (Razorpay)
- 👤 User authentication
- 📍 Address management
- ⭐ Reviews and ratings
- 🔔 Notifications
- 💰 Coupon system

## Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- Expo Router (file-based routing)
- React Context API (state management)
- Supabase Client

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL database)
- Razorpay (payment gateway)
- JWT authentication

## Project Structure

```
urbannn/
├── app/                    # Expo Router pages
├── components/             # Reusable components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   ├── config/       # Configuration files
│   │   └── database/     # Database schema and seeds
│   └── .env.example      # Environment variables template
└── assets/               # Images, fonts, etc.
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for mobile testing)
- Supabase account
- Razorpay account (for payments)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd urbannn
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database schema:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and run `backend/src/database/schema.sql`
3. Run the seed data:
   - Copy and run `backend/src/database/seed.sql`
4. Create guest user:
   ```bash
   cd backend
   node create-guest-user.js
   ```

### 4. Configure Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key
- `RAZORPAY_KEY_ID`: Your Razorpay key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay secret

#### Frontend
Update `lib/api.ts` with your backend URL:
- For development: Use your computer's local IP (e.g., `http://192.168.0.100:3001/api`)
- For production: Use your deployed backend URL

### 5. Run the Application

#### Start Backend
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3001`

#### Start Frontend
```bash
# In the root directory
npx expo start
```

#### Test on Device
1. Install Expo Go on your phone
2. Scan the QR code from the terminal
3. App will load on your device

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/categories` - Get categories

### Bookings
- `POST /api/bookings/guest/address` - Create guest address
- `POST /api/bookings/guest` - Create guest booking
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

## Database Schema

Main tables:
- `users` - User accounts
- `services` - Available services
- `service_categories` - Service categories
- `bookings` - Service bookings
- `user_addresses` - User addresses
- `service_providers` - Service professionals
- `payments` - Payment records
- `reviews` - Service reviews
- `coupons` - Discount coupons
- `notifications` - User notifications

## Development Notes

### Network Configuration
- Backend must listen on `0.0.0.0` to accept connections from mobile devices
- Update API URLs in `lib/api.ts` and `app/offers/mens-booking.tsx` with your local IP
- Android requires `usesCleartextTraffic: true` in `app.json` for HTTP connections

### Guest Booking Flow
1. User fills booking form
2. Address is created via `/api/bookings/guest/address`
3. Booking is created via `/api/bookings/guest`
4. Professional is auto-assigned
5. Notification is sent
6. Success screen is shown

## Troubleshooting

### "Network request failed"
- Ensure backend is running
- Check if you're using the correct IP address
- Verify you're on the same WiFi network
- Check `usesCleartextTraffic` is enabled in `app.json`

### Backend not accessible
```bash
# Check if backend is running
curl http://YOUR_IP:3001/health

# Should return: {"status":"ok","timestamp":"..."}
```

### Database errors
- Ensure all SQL scripts are run in Supabase
- Check RLS policies are set correctly
- Verify guest user is created

## Deployment

### Backend
- Deploy to services like Railway, Render, or Heroku
- Set environment variables
- Update frontend API URLs

### Frontend
- Build with EAS Build
- Submit to App Store / Play Store
- Or use Expo Go for testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React Native and Node.js
