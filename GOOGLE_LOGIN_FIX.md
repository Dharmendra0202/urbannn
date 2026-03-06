# Google Login Error 401 Fix

## The Problem

You're getting "Error 401: invalid_client" because:
- The app is using Supabase's **web-based OAuth flow**
- You created an **Android OAuth client** in Google Console
- But Supabase needs the **Web OAuth client** credentials

## The Solution

You already have a **Web client** created! You just need to add its credentials to Supabase.

### Step 1: Get Your Web Client Credentials

1. Go to: https://console.cloud.google.com/apis/credentials?project=practical-bebop-480713-r7

2. Click on **"Web client 1"** (the Web application type)

3. You'll see:
   - **Client ID**: Something like `179531987014-v6ks...`
   - **Client Secret**: Something like `GOCSPX-...`

4. **Copy both** (you already have these from before!)

### Step 2: Add Credentials to Supabase

1. Go to: https://supabase.com/dashboard/project/zzamwulthzpjzsmlzilp/auth/providers

2. Find **Google** provider

3. Make sure these are filled in:
   - **Client ID**: Your Web client ID (starts with 179531987014...)
   - **Client Secret**: Your Web client secret (GOCSPX-...)

4. Click **Save**

### Step 3: Test Again

1. Wait 2-3 minutes
2. Clear app data on your phone
3. Open the app and try Google login
4. It should work now!

## Why This Works

- Supabase's `signInWithOAuth` uses **web-based OAuth flow**
- It opens a browser and redirects back to your app
- This flow requires the **Web OAuth client**, not Android client
- The Android client is only for native Google Sign-In SDK

## What About the Android Client?

The Android OAuth client you created is not needed for Supabase's web flow. It's only needed if you use the native `@react-native-google-signin/google-signin` package.

For now, the web flow with the Web client should work fine!

## If It Still Doesn't Work

The Web client credentials might not be in Supabase. Let me know and I'll help you add them.

---

**TL;DR**: Use your **Web client** credentials in Supabase, not the Android client!
