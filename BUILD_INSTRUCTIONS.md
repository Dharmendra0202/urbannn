# 🚀 Building Your APK - Step by Step

## ✅ Pre-Build Checklist

- [x] EAS CLI installed
- [x] Logged into Expo account: `dharmendra_15.04`
- [x] Project configured with EAS
- [x] Backend deployed and working
- [x] Database active

## 📱 Build APK Now

### Option 1: Quick Build (Recommended)

Run this command to build an APK:

```bash
npm run build:android:preview
```

Or directly:

```bash
eas build --platform android --profile preview
```

### Option 2: Production Build

For a production-ready build:

```bash
npm run build:android:production
```

Or:

```bash
eas build --platform android --profile production
```

## 🔄 Build Process

### What Happens Next:

1. **EAS will ask questions**:
   - "Generate a new Android Keystore?" → Answer: **Yes** (first time)
   - "Would you like to automatically create credentials?" → Answer: **Yes**

2. **Build starts on Expo servers**:
   - Your code is uploaded
   - Dependencies are installed
   - APK is compiled
   - Takes 10-20 minutes

3. **Build completes**:
   - You'll get a download link
   - APK will be available in your Expo dashboard

### Monitor Build Progress:

```bash
# The build will show a URL like:
https://expo.dev/accounts/dharmendra_15.04/projects/urbannn/builds/...
```

Visit this URL to watch the build progress in real-time.

## 📥 Download & Install APK

### After Build Completes:

1. **Download APK**:
   - Click the download link in terminal
   - Or go to: https://expo.dev/accounts/dharmendra_15.04/projects/urbannn/builds
   - Download the `.apk` file

2. **Transfer to Phone**:
   ```bash
   # Via USB
   adb install path/to/urbannn.apk
   
   # Or send via email/cloud
   # Or scan QR code from Expo dashboard
   ```

3. **Install on Phone**:
   - Open the APK file on your phone
   - Allow "Install from unknown sources" if prompted
   - Install the app
   - Open and test!

## 🔧 Build Configuration

Your current build settings (from `eas.json`):

### Preview Profile (APK):
```json
{
  "preview": {
    "distribution": "internal",
    "android": {
      "buildType": "apk",
      "gradleCommand": ":app:assembleRelease"
    }
  }
}
```

### Production Profile (AAB for Play Store):
```json
{
  "production": {
    "autoIncrement": true
  }
}
```

## 📊 Build Profiles Explained

### Preview Build (APK)
- **Use for**: Testing, sharing with team
- **Output**: `.apk` file
- **Install**: Direct install on any Android device
- **Size**: Larger file size
- **Distribution**: Manual installation

### Production Build (AAB)
- **Use for**: Google Play Store submission
- **Output**: `.aab` file (Android App Bundle)
- **Install**: Only via Play Store
- **Size**: Optimized, smaller downloads
- **Distribution**: Play Store only

## 🐛 Troubleshooting

### Build Fails with "Keystore not found"
```bash
# Clear credentials and regenerate
eas credentials
```

### Build Fails with "Out of memory"
- This is rare, usually Expo servers handle it
- Try building again

### Build Succeeds but APK Won't Install
- Make sure "Install from unknown sources" is enabled
- Check Android version (minimum: Android 5.0)

### App Crashes on Startup
- Check if all environment variables are in the build
- Verify backend URL is correct
- Check Expo logs: `npx expo start --no-dev --minify`

## 📱 Testing the APK

### After Installation:

1. **Open the app**
2. **Test guest booking**:
   - Navigate to a service
   - Fill booking form
   - Submit booking
   - Verify success

3. **Test admin login**:
   - Username: `Ayush sharma`
   - Password: `majnu@2909`

4. **Test navigation**:
   - Browse categories
   - View services
   - Check profile sections

## 🚀 Next Steps After Successful Build

### For Testing:
- Share APK with team members
- Test on different Android devices
- Collect feedback

### For Production:
1. Build production AAB:
   ```bash
   eas build --platform android --profile production
   ```

2. Create Google Play Console account

3. Submit to Play Store:
   ```bash
   eas submit --platform android
   ```

## 📝 Important Notes

### Native Modules
Your app uses these native modules (will work in APK):
- ✅ `react-native-razorpay` - Payment gateway
- ✅ `expo-local-authentication` - Biometric (removed for now)
- ✅ `expo-location` - Location services
- ✅ All other Expo modules

### Environment Variables
Make sure these are accessible in the build:
- Backend URL: `https://urbannn-server.vercel.app`
- Supabase URL: `https://zzamwulthzpjzsmlzilp.supabase.co`
- Razorpay keys: Test mode keys included

### App Permissions
Your app requests:
- `INTERNET` - Network access
- `ACCESS_NETWORK_STATE` - Check connectivity

## 🎯 Quick Command Reference

```bash
# Login to Expo
eas login

# Check who's logged in
eas whoami

# Build preview APK
eas build --platform android --profile preview

# Build production AAB
eas build --platform android --profile production

# Check build status
eas build:list

# View build details
eas build:view [build-id]

# Download build
eas build:download [build-id]

# Manage credentials
eas credentials

# Submit to Play Store
eas submit --platform android
```

## 💡 Pro Tips

1. **First build takes longer** (15-20 min) - subsequent builds are faster
2. **Keep terminal open** during build or it will continue in background
3. **Save the build URL** - you can always download APK later
4. **Test on real device** - emulators may behave differently
5. **Check Expo dashboard** - https://expo.dev for all your builds

## 🆘 Need Help?

- **Expo Docs**: https://docs.expo.dev/build/introduction/
- **EAS Build**: https://docs.expo.dev/build/setup/
- **Troubleshooting**: https://docs.expo.dev/build-reference/troubleshooting/

---

## ✅ Ready to Build!

Run this command now:

```bash
npm run build:android:preview
```

Or:

```bash
eas build --platform android --profile preview
```

The build will start and you'll get a download link when it's done! 🎉
