# 🔧 APK Build Troubleshooting Guide

## Common Build Failures & Solutions

### 1. ✅ FIXED: Image Files with Spaces
**Error**: `Duplicate resources` error during Gradle build

**Solution**: Already fixed! We renamed:
- `full body massage.jpg` → `full-body-massage.jpg`
- `AC service & cleaning.png` → `ac-service-cleaning.png`

### 2. ✅ FIXED: React Native SVG Version Mismatch
**Error**: `react-native-svg@15.15.3 - expected version: 15.12.1`

**Solution**: Installed exact version:
```bash
npm install react-native-svg@15.12.1 --save-exact
```

### 3. ✅ FIXED: Duplicate react-native-safe-area-context
**Error**: Found duplicates for react-native-safe-area-context

**Solution**: Added resolution in package.json:
```json
{
  "resolutions": {
    "react-native-safe-area-context": "5.6.0"
  }
}
```

Then run:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 4. ✅ FIXED: usesCleartextTraffic Configuration Error
**Error**: `android.usesCleartextTraffic should NOT have additional property 'usesCleartextTraffic'`

**Solution**: Removed invalid properties from app.json android section:
```json
{
  "android": {
    "package": "com.dharmendra_0.urbannn",
    "permissions": ["INTERNET", "ACCESS_NETWORK_STATE"]
  }
}
```

### 5. New Architecture Issues
**Error**: Gradle build fails with architecture errors

**Solution**: Already disabled in `app.json` (removed `newArchEnabled: true`)

## Current Build Command

```bash
# Clean build with cache cleared
eas build -p android --profile preview --clear-cache
```

## If Build Still Fails

### Step 1: Clean Everything
```bash
# Clean node modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Fix any version mismatches
npx expo install --fix
```

### Step 2: Check Build Logs
Go to the build URL provided by EAS and check the detailed logs for specific errors.

### Step 3: Try Local Build (Alternative)
```bash
# Install EAS CLI locally
npm install -g eas-cli

# Login
eas login

# Build locally (requires Android Studio)
eas build --platform android --local
```

## Production Build Checklist

Before building for production:

### 1. Update API URLs
**Files to update:**
- `lib/api.ts`
- `app/offers/mens-booking.tsx`

Change from:
```typescript
const API_URL = 'http://192.168.0.100:3001/api';
```

To:
```typescript
const API_URL = 'https://your-backend.vercel.app/api';
```

### 2. Update Version Numbers

**`app.json`:**
```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    }
  }
}
```

Increment these for each new build.

## Build Profiles

### Preview (APK for Testing)
```bash
eas build -p android --profile preview
```
- Output: APK file
- Can install directly on devices
- Good for testing

### Production (AAB for Play Store)
```bash
eas build -p android --profile production
```
- Output: AAB (Android App Bundle)
- For Google Play Store submission
- Optimized and signed

## Common Gradle Errors

### Error: "Execution failed for task ':app:mergeReleaseResources'"
**Cause**: Duplicate or invalid resource files

**Solution**:
1. Check for files with special characters
2. Check for duplicate file names
3. Ensure all referenced images exist

### Error: "Could not resolve all files for configuration"
**Cause**: Dependency version conflicts

**Solution**:
```bash
rm -rf node_modules
npm install
npx expo install --fix
```

### Error: "AAPT: error: resource android:attr/lStar not found"
**Cause**: Android SDK version mismatch

**Solution**: Update `app.json`:
```json
{
  "android": {
    "compileSdkVersion": 34,
    "targetSdkVersion": 34,
    "minSdkVersion": 21
  }
}
```

## Getting Help

### 1. Check Build Logs
Always check the full build logs on Expo's website for detailed error messages.

### 2. EAS Build Status
```bash
eas build:list
```

### 3. View Specific Build
```bash
eas build:view [BUILD_ID]
```

### 4. Expo Forums
https://forums.expo.dev/

### 5. Discord
https://chat.expo.dev/

## Quick Fix Commands

```bash
# Fix dependencies
npx expo install --fix

# Clear cache and rebuild
eas build -p android --profile preview --clear-cache

# Check EAS CLI version
eas --version

# Update EAS CLI
npm install -g eas-cli@latest

# Check project configuration
eas config

# Validate credentials
eas credentials
```

## Success Indicators

When build succeeds, you'll see:
```
✔ Build finished
✔ APK: https://expo.dev/artifacts/...
```

Download the APK and install on your Android device!

## Current Status

✅ Image files fixed (no spaces or special characters)
✅ React Native SVG version fixed (15.12.1)
✅ New architecture disabled
✅ Package name configured
✅ Icons configured
✅ Duplicate dependencies resolved
✅ app.json configuration fixed

**Ready to build!** After running `npm install`, try:
```bash
eas build -p android --profile preview --clear-cache
```

---

**If you encounter any new errors, share the build logs and I'll help fix them!**
