# Urbannn - Tech Stack

## Frontend (Mobile App)

### Core Framework
- **React Native** 0.81.5 - Cross-platform mobile development
- **Expo** ~54.0.33 - Development platform and build tools
- **Expo Router** ~6.0.23 - File-based routing system
- **TypeScript** ~5.9.2 - Type-safe JavaScript

### UI & Styling
- **React Native Reanimated** ~4.1.1 - Smooth animations
- **Moti** ^0.30.0 - Declarative animations
- **Expo Linear Gradient** ~15.0.8 - Gradient backgrounds
- **Expo Blur** ~15.0.8 - Blur effects
- **React Native SVG** 15.12.1 - SVG support
- **Lottie React Native** ~7.3.1 - JSON-based animations
- **React Native Chart Kit** ^6.12.0 - Charts for admin dashboard

### Navigation
- **React Navigation** ^7.1.8 - Navigation library
- **React Navigation Bottom Tabs** ^7.4.0 - Tab navigation
- **React Navigation Native Stack** ^7.3.16 - Stack navigation
- **React Native Screens** ~4.16.0 - Native screen optimization
- **React Native Gesture Handler** ~2.28.0 - Touch gestures

### State Management & Storage
- **React Context API** - Global state management
- **AsyncStorage** ^2.2.0 - Local data persistence
- **React Hooks** - Component state management

### Backend Integration
- **Supabase JS** ^2.97.0 - Database client
- **Fetch API** - HTTP requests
- **React Native URL Polyfill** ^2.0.0 - URL support

### Additional Features
- **Expo Location** ~19.0.8 - Geolocation services
- **Expo Haptics** ~15.0.8 - Haptic feedback
- **Expo Web Browser** ~15.0.10 - In-app browser
- **Expo Image** ~3.0.11 - Optimized image component
- **React Native Reanimated Carousel** ^4.0.3 - Carousel component
- **React Native Safe Area Context** ~5.6.0 - Safe area handling

### Icons & Fonts
- **@expo/vector-icons** ^15.0.3 - Icon library (Ionicons, MaterialIcons, etc.)
- **Expo Font** ~14.0.11 - Custom font loading

## Backend (API Server)

### Core Framework
- **Node.js** - JavaScript runtime
- **Express.js** ^4.18.2 - Web framework
- **JavaScript (ES6+)** - Programming language

### Database
- **Supabase** - PostgreSQL database (cloud-hosted)
- **PostgreSQL** - Relational database
- **Supabase JS** ^2.39.0 - Database client

### Authentication & Security
- **JSON Web Tokens (JWT)** ^9.0.2 - Token-based auth
- **bcryptjs** ^2.4.3 - Password hashing
- **Helmet** ^7.1.0 - Security headers
- **CORS** ^2.8.5 - Cross-origin resource sharing
- **Express Rate Limit** ^7.1.5 - API rate limiting

### Payment Integration
- **Razorpay** ^2.9.2 - Payment gateway

### Validation & Utilities
- **Joi** ^17.11.0 - Schema validation
- **UUID** ^9.0.1 - Unique ID generation
- **dotenv** ^16.3.1 - Environment variables
- **Morgan** ^1.10.0 - HTTP request logger

### Development Tools
- **Nodemon** ^3.0.2 - Auto-restart on file changes

## Deployment & Infrastructure

### Mobile App
- **EAS Build** - Expo Application Services for building APK/IPA
- **Expo Go** - Development client for testing

### Backend
- **Vercel** - Serverless deployment platform
- **URL**: https://urbannn-server.vercel.app

### Database
- **Supabase Cloud** - Managed PostgreSQL hosting
- **Row Level Security (RLS)** - Database security policies

### Version Control
- **Git** - Version control system
- **GitHub** - Code repository hosting
  - Frontend: github.com/Dharmendra0202/urbannn
  - Backend: github.com/Dharmendra0202/urbannn-backend

## Architecture

### Frontend Architecture
```
app/
├── (tabs)/          # Tab-based navigation screens
├── admin/           # Admin dashboard
├── auth/            # Authentication screens
├── categories/      # Service category screens
├── cleaning/        # Cleaning service screens
├── offers/          # Special offers screens
├── recommended/     # Recommended services
├── repair/          # Repair service screens
└── services/        # Service detail screens

components/          # Reusable UI components
constants/           # Static data and configurations
context/            # React Context providers
hooks/              # Custom React hooks
lib/                # Utility functions and API client
```

### Backend Architecture
```
src/
├── routes/         # API route handlers
│   ├── auth.routes.js
│   ├── booking.routes.js
│   ├── coupon.routes.js
│   ├── notification.routes.js
│   ├── payment.routes.js
│   ├── review.routes.js
│   ├── service.routes.js
│   └── user.routes.js
├── middleware/     # Express middleware
├── config/         # Configuration files
├── database/       # Database schema and seeds
└── server.js       # Entry point
```

## API Endpoints

### Services
- GET `/api/services` - List all services
- GET `/api/services/:id` - Get service by ID
- GET `/api/services/slug/:slug` - Get service by slug
- GET `/api/services/categories` - List categories

### Bookings
- POST `/api/bookings/guest` - Create guest booking
- POST `/api/bookings/guest/address` - Create guest address
- GET `/api/bookings` - List user bookings
- PATCH `/api/bookings/:id/status` - Update booking status
- POST `/api/bookings/:id/cancel` - Cancel booking

### Payments
- POST `/api/payments/create-order` - Create Razorpay order
- POST `/api/payments/verify` - Verify payment
- POST `/api/payments/:id/refund` - Initiate refund

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/send-otp` - Send OTP
- POST `/api/auth/verify-otp` - Verify OTP

### Users
- GET `/api/users/profile` - Get user profile
- PATCH `/api/users/profile` - Update profile
- GET `/api/users/addresses` - List addresses
- POST `/api/users/addresses` - Add address

### Reviews & Coupons
- GET `/api/reviews/service/:id` - Service reviews
- POST `/api/reviews` - Create review
- GET `/api/coupons` - List coupons
- POST `/api/coupons/validate` - Validate coupon

## Database Schema

### Main Tables
- `users` - User accounts
- `services` - Service catalog
- `categories` - Service categories
- `bookings` - Service bookings
- `addresses` - User addresses
- `payments` - Payment records
- `reviews` - Service reviews
- `coupons` - Discount coupons
- `notifications` - User notifications
- `service_providers` - Service professionals

## Features

### User Features
- Browse services by category
- View service details and pricing
- Book services with date/time selection
- Guest booking (no registration required)
- Persistent booking history
- Multiple payment options (Cash, UPI, Card)
- View booking status
- Cancel bookings

### Admin Features
- Admin dashboard with analytics
- View all bookings
- Mark bookings as complete
- Revenue tracking
- Booking statistics
- Pie chart visualizations

### Technical Features
- Offline-first architecture
- Real-time data sync with Supabase
- Secure authentication with JWT
- Payment gateway integration
- Push notifications ready
- Responsive design
- Dark mode support
- Haptic feedback
- Smooth animations
- Image optimization
- API rate limiting
- CORS protection
- Security headers

## Development Tools

- **ESLint** - Code linting
- **Expo CLI** - Development server
- **EAS CLI** - Build and deployment
- **Git** - Version control
- **VS Code** - Code editor (recommended)

## Environment Variables

### Frontend (.env)
```
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
```

### Backend (.env)
```
PORT
NODE_ENV
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
JWT_SECRET
JWT_EXPIRES_IN
```

## Build Commands

### Development
```bash
# Frontend
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS

# Backend
npm run dev           # Start with nodemon
npm start             # Start production server
```

### Production
```bash
# Build Android APK
eas build -p android --profile preview

# Build iOS IPA
eas build -p ios --profile preview

# Deploy Backend
git push              # Auto-deploys to Vercel
```

## Performance Optimizations

- Lazy loading of images
- Memoized components
- Optimized re-renders
- Efficient state management
- Database indexing
- API response caching
- Image compression
- Code splitting
- Tree shaking

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Row Level Security (RLS) in database
- API rate limiting
- CORS protection
- Helmet security headers
- Input validation with Joi
- SQL injection prevention
- XSS protection

---

**Project Status**: Production Ready ✅
**Last Updated**: March 2026
**Version**: 1.0.0
