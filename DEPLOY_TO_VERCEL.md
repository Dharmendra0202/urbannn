# Deploy Backend to Vercel - Complete Guide

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email).

## Step 3: Deploy Backend

```bash
cd backend
vercel
```

You'll be asked:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No
4. **Project name?** → urbannn-backend (or press Enter)
5. **Directory?** → ./ (press Enter)
6. **Override settings?** → No

Vercel will deploy and give you a URL like:
```
https://urbannn-backend-xxx.vercel.app
```

## Step 4: Add Environment Variables

After deployment, add your environment variables:

```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_KEY
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
```

For each variable:
1. Paste the value from your `backend/.env` file
2. Select: **Production, Preview, and Development**
3. Press Enter

Or add them via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Click your project
3. Go to Settings → Environment Variables
4. Add each variable

## Step 5: Redeploy with Environment Variables

```bash
vercel --prod
```

This will deploy to production with your environment variables.

## Step 6: Test Your Deployment

Open in browser:
```
https://your-backend-url.vercel.app/health
```

Should return:
```json
{"status":"ok","timestamp":"2024-..."}
```

Test services endpoint:
```
https://your-backend-url.vercel.app/api/services
```

## Step 7: Update Frontend API URLs

Now update your app to use the deployed backend:

### File 1: `lib/api.ts` (line 3)

```typescript
const API_URL = 'https://your-backend-url.vercel.app/api';
```

### File 2: `app/offers/mens-booking.tsx`

Line ~120:
```typescript
const addressResponse = await fetch('https://your-backend-url.vercel.app/api/bookings/guest/address', {
```

Line ~145:
```typescript
const bookingResponse = await fetch('https://your-backend-url.vercel.app/api/bookings/guest', {
```

## Step 8: Rebuild APK

```bash
eas build -p android --profile preview
```

## Step 9: Test the New APK

1. Install the new APK on your phone
2. Try booking a service
3. It should work from anywhere! 🎉

## Vercel Free Tier Limits

✅ 100 GB bandwidth/month
✅ Unlimited deployments
✅ Automatic HTTPS
✅ Global CDN
✅ Serverless functions

Perfect for testing and small-scale production!

## Troubleshooting

### Issue: "Function execution timed out"

Vercel free tier has 10-second timeout. If your API calls take longer:
1. Optimize database queries
2. Add indexes to Supabase tables
3. Or upgrade to Vercel Pro

### Issue: "Environment variables not working"

Make sure you:
1. Added all variables via `vercel env add`
2. Redeployed with `vercel --prod`
3. Variables are set for Production environment

### Issue: "CORS errors"

The backend already has CORS enabled. If you still get errors, update `backend/src/server.js`:

```javascript
app.use(cors({
  origin: '*', // Allow all origins for now
  credentials: true
}));
```

## Alternative: Deploy to Railway

If you prefer Railway:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose `backend` folder
6. Add environment variables
7. Deploy!

Railway gives you a URL like:
```
https://urbannn-backend.up.railway.app
```

## Summary

After deployment:
- ✅ Backend accessible from anywhere
- ✅ APK works on any WiFi network
- ✅ Other people can use your app
- ✅ Professional production setup
- ✅ Automatic HTTPS
- ✅ Free hosting!

## Quick Commands Reference

```bash
# Deploy
cd backend
vercel

# Add environment variable
vercel env add VARIABLE_NAME

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove project
vercel remove urbannn-backend
```

---

**Ready to deploy?** Run `vercel` in the backend folder! 🚀
