# 📱 Build iOS App - Complete Guide

## Prerequisites for iOS Build

### 1. Apple Developer Account
- **Free Account**: Can build and test on your own devices (7 days expiry)
- **Paid Account ($99/year)**: Required for App Store submission

### 2. System Requirements
- ✅ macOS (you have this)
- ✅ Xcode installed (or EAS will handle it)

## Method 1: EAS Build (Recommended) ⭐

### Step 1: Build iOS App

```bash
eas build -p ios --profile preview
```

**What this does:**
- Builds an iOS app for testing
- Creates an IPA file
- Can be installed on registered devices

### Step 2: Register Your Device (First Time Only)

When prompted, EAS will ask you to register your device:

1. Open the URL provided in terminal on your iPhone
2. Follow instructions to register your device UDID
3. Build will continue automatically

### Step 3: Download and Install

After build completes:
1. Download the IPA file from the build URL
2. Install using one of these methods:
   - **TestFlight**: Upload to App Store Connect
   - **Direct Install**: Use Apple Configurator or Xcode
   - **OTA Install**: Use the Expo Go app

## Quick Commands

### Build for Testing (Development)
```bash
eas build -p ios --profile preview
```

### Build for App Store
```bash
eas build -p ios --profile production
```

### Check Build Status
```bash
eas build:list
```

## Important Notes

### 1. Apple Developer Account Setup

**Free Account:**
- Go to https://developer.apple.com
- Sign in with your Apple ID
- Accept terms and conditions

**Paid Account ($99/year):**
- Enroll at https://developer.apple.com/programs/
- Required for App Store submission
- Allows unlimited device testing

### 2. Device Registration

For testing on your iPhone:
- EAS will guide you through device registration
- You'll need to open a URL on your iPhone
- Device UDID will be automatically captured

### 3. Update API URLs for Production

Before building for production, update:

**`lib/api.ts`**
```typescript
const API_URL = 'https://your-production-backend.com/api';
```

**`app/offers/mens-booking.tsx`**
```typescript
const addressResponse = await fetch('https://your-production-backend.com/api/bookings/guest/address', {
  // ...
});
```

## Build Profiles

### Preview Profile
- **Use for:** Testing on your devices
- **Output:** IPA file
- **Requires:** Device registration
- **Command:** `eas build -p ios --profile preview`

### Production Profile
- **Use for:** App Store submission
- **Output:** IPA for App Store
- **Requires:** Paid Apple Developer account
- **Command:** `eas build -p ios --profile production`

## Installation Methods

### Method 1: TestFlight (Recommended)
1. Upload IPA to App Store Connect
2. Add testers via email
3. Testers install via TestFlight app

### Method 2: Direct Install
1. Connect iPhone to Mac via USB
2. Open Xcode
3. Window → Devices and Simulators
4. Drag IPA file to your device

### Method 3: OTA Install
1. EAS provides an install URL
2. Open URL on your iPhone
3. Follow prompts to install

## Troubleshooting

### "Not enrolled in Apple Developer Program"
- Sign up at https://developer.apple.com
- Free account works for testing
- Paid account needed for App Store

### "Device not registered"
- Follow the device registration flow
- Open the URL on your iPhone
- EAS will capture your device UDID

### "Provisioning profile error"
- EAS handles this automatically
- Make sure you're logged into your Apple account
- Run `eas credentials` to manage credentials

## Cost

### EAS Build:
- ✅ Free tier: 30 builds/month
- ✅ Paid: $29/month (unlimited builds)

### Apple Developer:
- ✅ Free: Testing on your own devices (7-day expiry)
- 💰 Paid: $99/year (App Store + unlimited testing)

## Next Steps After Building

### 1. Test Your App
- Install on your iPhone
- Test all features
- Verify backend connectivity

### 2. Prepare for App Store
- Create App Store listing
- Prepare screenshots
- Write app description
- Set up privacy policy

### 3. Submit to App Store
```bash
eas submit -p ios
```

---

## Quick Start (TL;DR)

```bash
# Build iOS app for testing
eas build -p ios --profile preview

# Follow device registration prompts
# Wait 15-25 minutes
# Download IPA from the link provided
# Install on your iPhone
```

---

**Ready to build? Run:** `eas build -p ios --profile preview`
