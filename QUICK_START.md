# 🚀 Quick Start Guide - Urbannn Backend

Get your backend up and running in 10 minutes!

## ⚡ Fast Setup (For Testing)

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Setup Supabase Database

1. Go to: https://supabase.com/dashboard/project/buaernvuayjihhwsfdl
2. Click **SQL Editor** → **New Query**
3. Copy content from `backend/src/database/schema.sql`
4. Paste and click **Run**
5. Create another **New Query**
6. Copy content from `backend/src/database/seed.sql`
7. Paste and click **Run**

### 3. Get Your Keys

**Supabase Keys:**
1. Go to **Project Settings** → **API**
2. Copy:
   - Project URL: `https://buaernvuayjihhwsfdl.supabase.co`
   - `anon` key (starts with `eyJ...`)
   - `service_role` key (starts with `eyJ...`)

**Razorpay Keys (Optional for now):**
1. Sign up at https://razorpay.com/
2. Go to **Settings** → **API Keys**
3. Generate Test Key
4. Copy Key ID and Secret

### 4. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` file:
```env
SUPABASE_URL=https://buaernvuayjihhwsfdl.supabase.co
SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_KEY=paste_your_service_role_key_here
RAZORPAY_KEY_ID=paste_your_razorpay_key_id
RAZORPAY_KEY_SECRET=paste_your_razorpay_secret
JWT_SECRET=any_random_long_string_here
```

### 5. Start Backend

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3000
```

### 6. Test It

Open new terminal:
```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/services
```

### 7. Configure React Native App

Install dependencies:
```bash
npm install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

Update `lib/supabase.ts`:
```typescript
const supabaseAnonKey = 'your_anon_key_here';
```

### 8. Run Your App

```bash
npm start
```

## ✅ You're Done!

Your backend is running with:
- ✅ 16 sample services
- ✅ 5 service categories
- ✅ 5 service providers
- ✅ 4 active coupons
- ✅ Payment gateway ready
- ✅ Authentication ready

## 🎯 Next Steps

1. **Test Authentication**: Try registering a user
2. **Browse Services**: Fetch services from API
3. **Create Booking**: Test booking flow
4. **Test Payment**: Use Razorpay test mode
5. **Deploy**: Follow `backend/DEPLOYMENT.md`

## 📚 Full Documentation

- **Complete Setup**: See `SETUP_GUIDE.md`
- **API Reference**: See `backend/README.md`
- **Deployment**: See `backend/DEPLOYMENT.md`

## 🆘 Need Help?

Common issues:

**"Cannot connect to backend"**
- Make sure backend is running: `npm run dev`
- Check port 3000 is available

**"Invalid API key"**
- Double-check keys in `.env`
- Make sure no extra spaces

**"Table does not exist"**
- Run schema.sql again in Supabase SQL Editor

## 🎉 Happy Coding!

You now have a production-ready backend with:
- User authentication
- Service management
- Booking system
- Payment processing
- Reviews & ratings
- Coupon system
- Notifications

Start building your features! 🚀
