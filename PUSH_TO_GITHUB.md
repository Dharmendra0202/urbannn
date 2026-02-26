# Push to GitHub - Instructions

## ✅ Ready to Push!

Your project is ready to be pushed to GitHub. Here's what to do:

## Step 1: Check Git Status

```bash
git status
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Commit Changes

```bash
git commit -m "feat: Complete home services booking app with backend

- Add React Native frontend with Expo Router
- Implement Node.js/Express backend with Supabase
- Add real-time booking system with guest user support
- Integrate Razorpay payment gateway
- Add authentication, reviews, coupons, notifications
- Configure network settings for mobile device testing
- Add comprehensive database schema and seed data
- Fix time format parsing for bookings
- Enable cleartext traffic for Android development
- Add environment configuration examples"
```

## Step 4: Push to GitHub

### If this is a new repository:

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### If repository already exists:

```bash
git push
```

## What's Included

### ✅ Source Code
- Complete React Native app
- Full Node.js backend
- Database schema and seeds
- All components and hooks

### ✅ Configuration
- `.env.example` files (no secrets)
- `.gitignore` (protects sensitive data)
- `app.json` with proper settings
- `metro.config.js`

### ✅ Documentation
- Comprehensive README.md
- Architecture documentation
- Setup instructions
- API documentation

### ❌ NOT Included (Protected)
- `.env` files (secrets)
- `node_modules/`
- `.expo/` cache
- Backend logs
- IDE settings

## After Pushing

### Update API URLs for Production

When you deploy the backend, update these files:
1. `lib/api.ts` - Change API_URL to production URL
2. `app/offers/mens-booking.tsx` - Update fetch URLs

### Environment Variables

Make sure to set these in your deployment platform:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `JWT_SECRET`

### Deploy Backend

Options:
- Railway: `railway up`
- Render: Connect GitHub repo
- Heroku: `git push heroku main`

### Build Mobile App

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## Repository Structure

```
urbannn/
├── app/                    # React Native screens
├── backend/               # Node.js API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── database/     # SQL files
│   │   └── config/       # Supabase, Razorpay config
│   └── .env.example      # Template
├── components/            # UI components
├── context/              # State management
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── README.md             # Documentation
└── .gitignore           # Protected files
```

## Verify Before Pushing

```bash
# Check no .env files are staged
git status | grep .env

# Should only show .env.example, not .env
```

## Clone and Setup (For Others)

After pushing, others can:

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd urbannn

# Install
npm install
cd backend && npm install && cd ..

# Setup .env files
cp backend/.env.example backend/.env
# Edit backend/.env with their credentials

# Run
cd backend && npm run dev &
npx expo start
```

---

**Ready to push!** Just run the commands above.
