# APK Network Issue Fix

## Problem
The installed APK shows "Network request failed" because it's trying to connect to `http://192.168.0.100:3001` which only works on your local WiFi network.

## Solutions

### Option 1: Quick Test (Same WiFi Network)

If you want to test the APK right now:

1. **Make sure your phone is on the SAME WiFi as your Mac**
2. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
3. **The APK should work now!**

### Option 2: Deploy Backend (Recommended)

For the APK to work anywhere, deploy your backend:

#### A. Deploy to Vercel (Free & Easy)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy backend:**
   ```bash
   cd backend
   vercel
   ```

3. **You'll get a URL like:** `https://your-backend.vercel.app`

4. **Update API URL in your code:**
   
   Edit `lib/api.ts`:
   ```typescript
   const API_URL = 'https://your-backend.vercel.app/api';
   ```
   
   Edit `app/offers/mens-booking.tsx` (line ~120):
   ```typescript
   const addressResponse = await fetch('https://your-backend.vercel.app/api/bookings/guest/address', {
   ```
   
   And line ~145:
   ```typescript
   const bookingResponse = await fetch('https://your-backend.vercel.app/api/bookings/guest', {
   ```

5. **Rebuild APK:**
   ```bash
   eas build -p android --profile preview
   ```

#### B. Deploy to Railway (Alternative)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your backend folder
5. Add environment variables (from backend/.env)
6. Get your deployment URL
7. Update API URLs as shown above
8. Rebuild APK

### Option 3: Use ngrok (Temporary Testing)

For quick testing without deployment:

1. **Install ngrok:**
   ```bash
   brew install ngrok
   ```

2. **Start backend:**
   ```bash
   cd backend
   npm start
   ```

3. **In another terminal, expose it:**
   ```bash
   ngrok http 3001
   ```

4. **Copy the HTTPS URL** (like `https://abc123.ngrok.io`)

5. **Update API URLs** in `lib/api.ts` and `app/offers/mens-booking.tsx`

6. **Rebuild APK**

## Files to Update

When changing API URL, update these 2 files:

1. **lib/api.ts** (line 3):
   ```typescript
   const API_URL = 'YOUR_BACKEND_URL/api';
   ```

2. **app/offers/mens-booking.tsx** (lines ~120 and ~145):
   ```typescript
   // Line 120
   const addressResponse = await fetch('YOUR_BACKEND_URL/api/bookings/guest/address', {
   
   // Line 145
   const bookingResponse = await fetch('YOUR_BACKEND_URL/api/bookings/guest', {
   ```

## Quick Test Right Now

Want to test immediately?

1. **Connect phone to same WiFi as Mac**
2. **Start backend:**
   ```bash
   cd backend
   npm start
   ```
3. **Open the APK and try booking** - it should work!

## Production Checklist

Before deploying to Play Store:

- [ ] Deploy backend to Vercel/Railway
- [ ] Update all API URLs to production URL
- [ ] Remove `usesCleartextTraffic` from app.json (if using HTTPS)
- [ ] Test all features with production backend
- [ ] Increment version number in app.json
- [ ] Build production APK/AAB
- [ ] Test on multiple devices

## Summary

Your APK is working perfectly! The "Network request failed" error is just because:
- The backend is running on your local Mac (192.168.0.100:3001)
- The APK can't reach it unless on same WiFi

**Quick fix:** Connect phone to same WiFi and start backend
**Permanent fix:** Deploy backend to Vercel/Railway and update API URLs

🎉 Congratulations on successfully building your first APK!
