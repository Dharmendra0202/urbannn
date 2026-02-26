# Backend Deployment Guide

## Deploy to Railway (Recommended)

Railway is the easiest way to deploy your Node.js backend.

### Step 1: Prepare Your Code

1. Make sure all files are committed to Git
2. Push to GitHub

```bash
git add .
git commit -m "Add backend"
git push origin main
```

### Step 2: Deploy to Railway

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click **New Project**
4. Select **Deploy from GitHub repo**
5. Choose your repository
6. Railway will auto-detect Node.js

### Step 3: Configure Environment Variables

1. Go to your project in Railway
2. Click **Variables** tab
3. Add all variables from `.env`:

```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://buaernvuayjihhwsfdl.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
APP_URL=https://your-app.railway.app
FRONTEND_URL=your_frontend_url
```

### Step 4: Set Start Command

1. Go to **Settings** > **Deploy**
2. Set **Start Command**: `npm start`
3. Set **Build Command**: `npm install`

### Step 5: Deploy

1. Click **Deploy**
2. Wait for deployment to complete
3. Copy your app URL (e.g., `https://urbannn-backend.railway.app`)

### Step 6: Update Frontend

Update `lib/api.ts` with your Railway URL:

```typescript
const API_URL = 'https://urbannn-backend.railway.app/api';
```

---

## Deploy to Render

### Step 1: Create Render Account

1. Go to https://render.com/
2. Sign up with GitHub

### Step 2: Create Web Service

1. Click **New +** > **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: urbannn-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

Add all variables from `.env` in the Environment section.

### Step 4: Deploy

Click **Create Web Service** and wait for deployment.

---

## Deploy to Heroku

### Step 1: Install Heroku CLI

```bash
npm install -g heroku
```

### Step 2: Login and Create App

```bash
heroku login
heroku create urbannn-backend
```

### Step 3: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_ANON_KEY=your_key
# ... add all other variables
```

### Step 4: Deploy

```bash
git push heroku main
```

### Step 5: Open App

```bash
heroku open
```

---

## Deploy to Vercel (Serverless)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Create vercel.json

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

### Step 3: Deploy

```bash
cd backend
vercel
```

Follow the prompts and add environment variables when asked.

---

## Post-Deployment Checklist

- [ ] Test health endpoint: `https://your-url.com/health`
- [ ] Test API endpoints: `https://your-url.com/api/services`
- [ ] Update frontend API_URL
- [ ] Test authentication flow
- [ ] Test payment flow with Razorpay test mode
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (usually automatic)
- [ ] Set up monitoring/alerts

---

## Production Checklist

Before going live:

- [ ] Switch to Razorpay live keys
- [ ] Enable Supabase production mode
- [ ] Set up proper SMS provider for OTP
- [ ] Configure CORS for your domain only
- [ ] Enable rate limiting
- [ ] Set up error tracking (Sentry)
- [ ] Set up logging (LogRocket, Datadog)
- [ ] Configure backups
- [ ] Set up CI/CD pipeline
- [ ] Load testing
- [ ] Security audit

---

## Monitoring

### Railway
- View logs in Railway dashboard
- Set up alerts for errors

### Render
- View logs in Render dashboard
- Enable auto-deploy on push

### Heroku
```bash
heroku logs --tail
```

---

## Troubleshooting

### "Application Error"
- Check logs for errors
- Verify all environment variables are set
- Ensure PORT is set correctly

### "Cannot connect to database"
- Verify Supabase URL and keys
- Check Supabase project is active

### "Payment verification failed"
- Verify Razorpay keys
- Check webhook signature

---

## Cost Estimates

### Railway
- Free tier: $5 credit/month
- Pro: $20/month

### Render
- Free tier: Available
- Starter: $7/month

### Heroku
- Free tier: Deprecated
- Basic: $7/month

### Vercel
- Free tier: Available
- Pro: $20/month

---

## Scaling

As your app grows:

1. **Database**: Upgrade Supabase plan
2. **Backend**: Scale horizontally (add more instances)
3. **Caching**: Add Redis for session/data caching
4. **CDN**: Use Cloudflare for static assets
5. **Load Balancer**: Distribute traffic across instances
