# 🚀 Quick Build Commands

## Install EAS CLI (One Time)
```bash
npm install -g eas-cli
```

## Login to Expo (One Time)
```bash
eas login
```

## Build APK for Testing
```bash
eas build -p android --profile preview
```

## Build for Play Store
```bash
eas build -p android --profile production
```

## Check Build Status
```bash
eas build:list
```

---

## Or Use the Script
```bash
./BUILD_APK_NOW.sh
```

---

## After Build Completes

1. **Download APK**
   - Click the link in terminal
   - Or go to: https://expo.dev

2. **Install on Android**
   - Transfer APK to phone
   - Enable "Install from Unknown Sources"
   - Tap APK to install

3. **Test Everything**
   - Browse services
   - Make a booking
   - Verify prices
   - Check all features

---

## Important: Before Production Build

### 1. Update Backend URLs
Replace `192.168.0.100:3001` with your production backend URL in:
- `lib/api.ts`
- `app/offers/mens-booking.tsx`

### 2. Remove Development Settings
In `app.json`, set:
```json
"usesCleartextTraffic": false
```

### 3. Test Thoroughly
- Test on multiple devices
- Test all booking flows
- Verify backend connectivity
- Check payment integration

---

## Build Time
- First build: 15-20 minutes
- Subsequent builds: 10-15 minutes

## Cost
- Free tier: 30 builds/month
- Enough for development and testing

---

**Ready? Run:** `eas build -p android --profile preview`
