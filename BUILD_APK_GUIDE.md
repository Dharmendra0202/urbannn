# 📱 Build APK - Complete Guide

## Method 1: EAS Build (Recommended) ⭐

EAS Build is Expo's cloud build service. It's the easiest way to build your APK.

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
eas login
```

If you don't have an Expo account:
- Go to https://expo.dev/signup
- Create a free account
- Then run `eas login` again

### Step 3: Configure Your Project

```bash
eas build:configure
```

This will update your `app.json` and `eas.json` files.

### Step 4: Build APK for Testing

```bash
eas build --platform android --profile preview
```

**What this does:**
- Builds an APK (not AAB)
- Can be installed directly on Android devices
- Perfect for testing and sharing

**Build time:** 10-20 minutes (first build takes longer)

### Step 5: Download Your APK

After the build completes:
1. You'll get a link in the terminal
2. Click the link or go to https://expo.dev/accounts/YOUR_USERNAME/projects/urbannn/builds
3. Download the APK file
4. Install it on your Android device

### Step 6: Build for Production (Google Play Store)

When ready to publish:

```bash
eas build --platform android --profile production
```

This creates an AAB (Android App Bundle) for the Play Store.

---

## Method 2: Local Build (Advanced)

If you want to build locally without EAS:

### Prerequisites:
- Android Studio installed
- Java JDK 17 installed
- Android SDK configured

### Steps:

1. **Install Expo CLI**
```bash
npm install -g @expo/cli
```

2. **Prebuild Native Code**
```bash
npx expo prebuild --platform android
```

3. **Build APK**
```bash
cd android
./gradlew assembleRelease
```

4. **Find APK**
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Quick Commands Reference

### Build APK for Testing
```bash
eas build -p android --profile preview
```

### Build for Production
```bash
eas build -p android --profile production
```

### Check Build Status
```bash
eas build:list
```

### View Build Details
```bash
eas build:view [BUILD_ID]
```

---

## Important Notes

### 1. Update API URLs for Production

Before building for production, update these files:

**`lib/api.ts`**
```typescript
// Change from local IP to your production backend URL
const API_URL = 'https://your-backend-url.com/api';
```

**`app/offers/mens-booking.tsx`**
```typescript
// Update fetch URLs to production backend
const addressResponse = await fetch('https://your-backend-url.com/api/bookings/guest/address', {
  // ...
});
```

### 2. Remove Development Settings

**`app.json`**
```json
{
  "android": {
    // Remove this for production:
    "usesCleartextTraffic": false  // or remove the line
  }
}
```

### 3. Update App Version

**`app.json`**
```json
{
  "expo": {
    "version": "1.0.0",  // Increment for each release
    "android": {
      "versionCode": 1  // Increment for each build
    }
  }
}
```

---

## Troubleshooting

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Build failed"
- Check the build logs on expo.dev
- Common issues:
  - Missing dependencies
  - Invalid app.json configuration
  - Network issues

### "APK won't install"
- Enable "Install from Unknown Sources" on Android
- Make sure you downloaded the correct APK
- Try uninstalling old version first

---

## Build Profiles Explained

### Preview Profile (APK)
- **Use for:** Testing, sharing with testers
- **Output:** APK file
- **Can install:** Directly on devices
- **Command:** `eas build -p android --profile preview`

### Production Profile (AAB)
- **Use for:** Google Play Store submission
- **Output:** AAB (Android App Bundle)
- **Can install:** Only through Play Store
- **Command:** `eas build -p android --profile production`

### Development Profile
- **Use for:** Development with Expo Go
- **Output:** Development client
- **Command:** `eas build -p android --profile development`

---

## Cost

### EAS Build Free Tier:
- ✅ Unlimited builds for open-source projects
- ✅ 30 builds/month for personal projects
- ✅ Free for testing and development

### Paid Plans:
- Production: $29/month (unlimited builds)
- Enterprise: Custom pricing

---

## Next Steps After Building

### 1. Test Your APK
- Install on multiple Android devices
- Test all features
- Check booking flow
- Verify backend connectivity

### 2. Prepare for Play Store
- Create Google Play Developer account ($25 one-time fee)
- Prepare app listing (screenshots, description, icon)
- Set up privacy policy
- Configure app signing

### 3. Submit to Play Store
```bash
eas submit -p android
```

---

## Quick Start (TL;DR)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build -p android --profile preview

# Wait 10-20 minutes
# Download APK from the link provided
# Install on your Android device
```

---

## Support

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Expo Forums: https://forums.expo.dev/
- Discord: https://chat.expo.dev/

---

**Ready to build? Run:** `eas build -p android --profile preview`
