# Deploy Backend via Vercel Dashboard (Easy Method)

## Step 1: Push Backend to GitHub

First, let's push your backend code to GitHub:

```bash
# Initialize git in backend folder (if not already)
cd backend
git init

# Add all files
git add .

# Commit
git commit -m "Backend ready for deployment"

# Create a new repository on GitHub named "urbannn-backend"
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/urbannn-backend.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy from Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Click "Import" next to your `urbannn-backend` repository
   - If you don't see it, click "Adjust GitHub App Permissions"
4. **Configure Project**:
   - **Project Name**: urbannn-backend
   - **Framework Preset**: Other
   - **Root Directory**: ./ (leave as is)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: npm install
5. **Add Environment Variables** (click "Environment Variables"):
   
   Add these from your `backend/.env` file:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   NODE_ENV=production
   ```

6. **Click "Deploy"**

## Step 3: Wait for Deployment

Vercel will:
- Install dependencies
- Build your project
- Deploy it globally
- Give you a URL like: `https://urbannn-backend-xxx.vercel.app`

## Step 4: Test Your Deployment

Open in browser:
```
https://your-backend-url.vercel.app/health
```

Should return:
```json
{"status":"ok","timestamp":"..."}
```

Test services:
```
https://your-backend-url.vercel.app/api/services
```

## Step 5: Copy Your Backend URL

Copy the full URL from Vercel dashboard (something like):
```
https://urbannn-backend-abc123.vercel.app
```

## Alternative: Deploy Without GitHub

If you don't want to use GitHub:

### Option A: Use Vercel CLI (when network works)

```bash
cd backend
vercel
```

### Option B: Drag & Drop

1. Go to https://vercel.com/new
2. Click "Browse" or drag your `backend` folder
3. Add environment variables
4. Click "Deploy"

## Next Steps

After deployment, I'll help you:
1. Update the API URLs in your app
2. Rebuild the APK
3. Test it from anywhere!

---

**Which method do you prefer?**
- GitHub (recommended - automatic updates)
- Drag & Drop (quick and easy)
- CLI (when network is stable)
