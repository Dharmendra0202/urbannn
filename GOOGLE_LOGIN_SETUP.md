# Google Login Setup - What You Need to Do

I've created a beautiful login page for your app! Now you need to configure Google OAuth in Supabase.

## ✅ What I've Done

1. ✅ Installed required packages (`expo-web-browser`, `expo-auth-session`)
2. ✅ Created beautiful login page at `app/auth/login.tsx`
3. ✅ Updated `lib/supabase.ts` for OAuth support
4. ✅ Updated `app.json` with auth session config
5. ✅ Designed with your app's colors (teal/green gradient)

## 🎨 Login Page Features

- **Animated gradient background** (matches your app style)
- **Google login button** (white card with Google icon)
- **Guest login option** (for users who don't want to sign in)
- **Benefits list** (shows why users should sign in)
- **Smooth animations** (using Moti)
- **Professional design** (modern, clean, trustworthy)

## 📋 What YOU Need to Do (15 minutes)

### Step 1: Enable Google Auth in Supabase (5 mins)

1. Go to https://supabase.com/dashboard
2. Select your project: **zzamwulthzpjzsmlzilp**
3. Click **Authentication** in the left sidebar
4. Click **Providers**
5. Find **Google** and toggle it ON
6. Keep this tab open - you'll need to paste credentials here

### Step 2: Create Google OAuth App (10 mins)

1. Go to https://console.cloud.google.com/
2. Click **Select a project** → **New Project**
   - Project name: **Urbannn**
   - Click **Create**
3. Wait for project to be created, then select it
4. In the search bar, type **"OAuth consent screen"** and click it
5. Configure OAuth Consent Screen:
   - User Type: **External**
   - Click **Create**
   - Fill in:
     - App name: **Urbannn**
     - User support email: **your email**
     - Developer contact: **your email**
   - Click **Save and Continue**
   - Skip Scopes (click **Save and Continue**)
   - Skip Test Users (click **Save and Continue**)
   - Click **Back to Dashboard**

6. Now create credentials:
   - In search bar, type **"Credentials"** and click it
   - Click **+ Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: **Urbannn Web Client**
   - Authorized redirect URIs - Click **+ Add URI** and paste:
     ```
     https://zzamwulthzpjzsmlzilp.supabase.co/auth/v1/callback
     ```
   - Click **Create**
   - You'll see a popup with **Client ID** and **Client Secret**
   - **COPY BOTH** (you'll need them in next step)

### Step 3: Add Credentials to Supabase (2 mins)

1. Go back to your Supabase tab (Authentication → Providers → Google)
2. Paste the **Client ID** from Google
3. Paste the **Client Secret** from Google
4. Click **Save**

### Step 4: Test the Login (3 mins)

1. In your terminal, run:
   ```bash
   npm start
   ```

2. Open the app on your phone or emulator

3. Navigate to the login page:
   ```bash
   # In Expo, press 'a' for Android or 'i' for iOS
   ```

4. Click **"Continue with Google"**

5. You should see Google's login page open in a browser

6. Sign in with your Google account

7. You'll be redirected back to the app!

## 🎯 How to Navigate to Login Page

### Option 1: Add Login Button to Home Screen

Add this to your home screen (`app/(tabs)/index.tsx`):

```typescript
<TouchableOpacity 
  style={styles.loginButton}
  onPress={() => router.push('/auth/login')}
>
  <Text>Sign In</Text>
</TouchableOpacity>
```

### Option 2: Make Login Required

Update `app/_layout.tsx` to check if user is logged in:

```typescript
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  router.replace('/auth/login');
}
```

### Option 3: Add to Profile Tab

Add a "Sign In" button in the profile tab for logged-out users.

## 🔧 Troubleshooting

### "Invalid redirect URI"
- Make sure you added the exact redirect URI in Google Console:
  ```
  https://zzamwulthzpjzsmlzilp.supabase.co/auth/v1/callback
  ```

### "OAuth consent screen not configured"
- Complete the OAuth consent screen setup in Google Console

### "Login cancelled"
- User closed the browser - this is normal behavior

### "Session not found"
- Make sure `detectSessionInUrl: true` in `lib/supabase.ts` (already done)

## 📱 Testing Checklist

- [ ] Google login button appears
- [ ] Clicking button opens browser
- [ ] Can sign in with Google account
- [ ] Redirects back to app after login
- [ ] User session is saved
- [ ] Guest login still works
- [ ] App remembers login after restart

## 🎨 Customization Options

Want to change the design? Edit `app/auth/login.tsx`:

- **Colors**: Change gradient colors in `LinearGradient`
- **Logo**: Replace the home icon with your logo image
- **Text**: Update app name, tagline, benefits
- **Buttons**: Modify button styles

## 🚀 Next Steps After Login Works

1. **Add Phone OTP Login** (alternative to Google)
2. **Show user profile** in Profile tab
3. **Save user bookings** to their account
4. **Add logout button**
5. **Sync guest bookings** to logged-in account

## 📞 Need Help?

If you get stuck:
1. Check the Supabase logs (Authentication → Logs)
2. Check browser console for errors
3. Make sure redirect URI matches exactly
4. Verify Google OAuth app is in "Testing" or "Published" mode

---

**Estimated Setup Time**: 15 minutes
**Difficulty**: Easy (just copy-paste credentials)
**Result**: Professional Google login in your app! 🎉

Let me know when you're done and I'll help you test it!
