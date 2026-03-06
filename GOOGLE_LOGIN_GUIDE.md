# Add Google Login to Urbannn App

Google login is easy with Supabase! Here's how to add it:

## Step 1: Enable Google Auth in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `zzamwulthzpjzsmlzilp`
3. Go to **Authentication** → **Providers**
4. Find **Google** and click to enable it
5. You'll need to create a Google OAuth app:

### Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen first (if prompted):
   - User Type: External
   - App name: Urbannn
   - User support email: your email
   - Developer contact: your email
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: Urbannn Web
   - Authorized redirect URIs: 
     ```
     https://zzamwulthzpjzsmlzilp.supabase.co/auth/v1/callback
     ```
7. Copy the **Client ID** and **Client Secret**
8. Paste them in Supabase Google provider settings
9. Click **Save**

## Step 2: Install Required Package

```bash
npm install @react-native-google-signin/google-signin
```

## Step 3: Configure Google Sign-In for Android

Add to `android/build.gradle`:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

Add to `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
}
```

## Step 4: Update Login Screen

I'll create a new login screen with Google button:

```typescript
// app/auth/login.tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from '@/lib/supabase';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // From Google Cloud Console
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com', // Optional, for iOS
});

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    if (userInfo.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.idToken,
      });
      
      if (error) throw error;
      
      // Success! User is logged in
      console.log('Logged in:', data.user);
      router.push('/(tabs)');
    }
  } catch (error) {
    console.error('Google sign in error:', error);
  }
};
```

## Step 5: Alternative - Use Supabase Web Flow (Easier!)

If the native Google Sign-In is complex, use Supabase's web flow:

```typescript
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const signInWithGoogle = async () => {
  const redirectUrl = makeRedirectUri({
    path: 'auth/callback',
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Open browser for Google login
  if (data?.url) {
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUrl
    );

    if (result.type === 'success') {
      // Handle the redirect URL
      const url = result.url;
      // Supabase will handle the session automatically
    }
  }
};
```

## Step 6: Update app.json

Add deep linking configuration:

```json
{
  "expo": {
    "scheme": "urbannn",
    "plugins": [
      [
        "expo-auth-session",
        {
          "schemes": ["urbannn"]
        }
      ]
    ]
  }
}
```

## Step 7: Create Complete Login UI

```typescript
import { Ionicons } from '@expo/vector-icons';

<View style={styles.container}>
  <Text style={styles.title}>Welcome to Urbannn</Text>
  
  {/* Google Login Button */}
  <TouchableOpacity 
    style={styles.googleButton}
    onPress={signInWithGoogle}
  >
    <Ionicons name="logo-google" size={24} color="#DB4437" />
    <Text style={styles.googleButtonText}>Continue with Google</Text>
  </TouchableOpacity>
  
  {/* Divider */}
  <View style={styles.divider}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>OR</Text>
    <View style={styles.dividerLine} />
  </View>
  
  {/* Phone Login */}
  <TouchableOpacity 
    style={styles.phoneButton}
    onPress={() => router.push('/auth/phone-login')}
  >
    <Ionicons name="call-outline" size={24} color="#0F766E" />
    <Text style={styles.phoneButtonText}>Continue with Phone</Text>
  </TouchableOpacity>
  
  {/* Guest Booking */}
  <TouchableOpacity 
    style={styles.guestButton}
    onPress={() => router.push('/(tabs)')}
  >
    <Text style={styles.guestButtonText}>Continue as Guest</Text>
  </TouchableOpacity>
</View>
```

## Benefits of Google Login

✅ **One-tap login** - No password to remember
✅ **Trusted** - Users trust Google authentication
✅ **Fast signup** - Auto-fills name, email, profile photo
✅ **Secure** - Google handles security
✅ **Professional** - Modern apps have social login

## Other Social Logins You Can Add

Supabase also supports:
- **Apple Sign In** (required for iOS App Store)
- **Facebook Login**
- **GitHub Login**
- **Twitter/X Login**

All follow the same pattern!

## Recommended Login Flow

1. **Google Login** (primary, most popular)
2. **Phone OTP** (for users without Google)
3. **Guest Booking** (no login required)

This covers all user types!

## Next Steps

1. Enable Google provider in Supabase
2. Get Google OAuth credentials
3. Choose implementation method (native or web flow)
4. Update login screen UI
5. Test on Android device
6. Add Apple Sign In for iOS

Would you like me to implement this for you?

---

**Estimated Time**: 1-2 hours
**Difficulty**: Medium
**Impact**: High (increases signups by 30-40%)
