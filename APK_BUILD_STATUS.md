# 🔧 APK Build - Fixed Image Issues

## ✅ Issues Fixed:

### 1. Removed Spaces from Image Filenames
- `full body massage.jpg` → `full-body-massage.jpg`
- `AC service & cleaning.png` → `ac-service-cleaning.png`
- Updated all references in `constants/image-assets.ts`

### 2. Disabled New Architecture
- Removed `newArchEnabled: true` from `app.json`

### 3. Added iOS Bundle Identifier
- Added `bundleIdentifier` for future iOS builds

## 🚀 Ready to Build Android APK

Run this command:

```bash
eas build -p android --profile preview
```

Or use the build script:

```bash
./BUILD_APK_NOW.sh
```

### Track Your Build:

**Option 1: Web Dashboard**
https://expo.dev/accounts/dharmendra_0/projects/urbannn/builds/962cfb39-9e8a-4e47-b970-5f658267fda1

**Option 2: Command Line**
```bash
eas build:list
```

**Option 3: View Specific Build**
```bash
eas build:view 962cfb39-9e8a-4e47-b970-5f658267fda1
```

## What's Happening Now:

1. ✅ Project files uploaded (83.2 MB)
2. ✅ Build queued
3. 🔄 Building APK (in progress)
4. ⏳ Waiting for completion...

## When Build Completes:

You'll receive:
1. **Download link** in your terminal (if still running)
2. **Email notification** to your Expo account
3. **APK file** ready to download from the web dashboard

## Next Steps:

### 1. Download APK
- Go to the build URL above
- Click "Download" button
- Save the APK file

### 2. Install on Android
- Transfer APK to your phone (via USB, email, or cloud)
- Enable "Install from Unknown Sources" in Android settings
- Tap the APK file to install

### 3. Test Your App
- Open the installed app
- Test all features:
  - Browse services
  - Make a booking
  - Verify prices
  - Check all screens

## Important Notes:

⚠️ **This APK uses local backend (192.168.0.100:3001)**
- Will only work when connected to the same WiFi network
- Backend must be running on your computer

### For Production APK:

Before building for production, update these files:

**1. Update Backend URLs**

`lib/api.ts`:
```typescript
const API_URL = 'https://your-production-backend.com/api';
```

`app/offers/mens-booking.tsx`:
```typescript
const addressResponse = await fetch('https://your-production-backend.com/api/bookings/guest/address', {
  // ...
});

const bookingResponse = await fetch('https://your-production-backend.com/api/bookings/guest', {
  // ...
});
```

**2. Remove Development Settings**

`app.json`:
```json
{
  "android": {
    "usesCleartextTraffic": false  // or remove this line
  }
}
```

**3. Build Production APK**
```bash
eas build -p android --profile production
```

## Troubleshooting:

### Build Failed?
- Check build logs on the web dashboard
- Common issues:
  - Missing dependencies
  - Invalid configuration
  - Network issues

### Can't Install APK?
- Enable "Install from Unknown Sources"
- Uninstall old version first
- Check Android version compatibility

### App Crashes?
- Check if backend is running
- Verify you're on the same WiFi network
- Check app logs in Android Studio

## Build Commands Reference:

```bash
# Check build status
eas build:list

# View specific build
eas build:view 962cfb39-9e8a-4e47-b970-5f658267fda1

# Build new APK
eas build -p android --profile preview

# Build for production
eas build -p android --profile production
```

---

**Your APK will be ready in 10-20 minutes!**

Check the web dashboard for progress:
https://expo.dev/accounts/dharmendra_0/projects/urbannn/builds
