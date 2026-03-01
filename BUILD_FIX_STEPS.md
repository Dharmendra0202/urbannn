# Build Fix Steps - Duplicate Dependencies Issue

## Problem
The build is failing due to duplicate `react-native-safe-area-context` dependencies:
- Main app uses version 5.6.0
- `react-native-calendars` package includes version 4.5.0

## Solution Steps

### Step 1: Remove react-native-calendars (Temporary)

Since the calendar component is causing the duplicate dependency issue, let's remove it temporarily:

```bash
npm uninstall react-native-calendars
```

### Step 2: Update package.json

Remove the calendar dependency and its resolution:

```json
{
  "dependencies": {
    // Remove this line:
    // "react-native-calendars": "^1.1313.0",
  },
  "resolutions": {
    // Keep this:
    "react-native-safe-area-context": "5.6.0"
  }
}
```

### Step 3: Clean and Reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### Step 4: Build Again

```bash
eas build -p android --profile preview
```

## Alternative: Use Different Date Picker

If you need date selection, use a different package that doesn't have conflicts:

### Option 1: React Native DateTimePicker
```bash
npx expo install @react-native-community/datetimepicker
```

### Option 2: Custom Date Picker
Build a simple custom date picker using React Native components.

## After Successful Build

Once the APK builds successfully, you can:

1. **Test the APK** on your device
2. **Add calendar back** if needed with proper version resolution
3. **Make any changes** to the code
4. **Rebuild** whenever you want

## Current Build Status

✅ Cleaned up duplicate documentation files
✅ Fixed app.json configuration  
✅ Added dependency resolutions
✅ Removed invalid Android properties
⚠️ Need to resolve calendar dependency conflict

## Next Build Command

After removing react-native-calendars:

```bash
eas build -p android --profile preview --clear-cache
```

## Important Notes

- The APK build does NOT lock your code
- You can make changes anytime after building
- Each build creates a new APK with your latest changes
- Increment version numbers for each new build

## Build Logs

Check the detailed logs at:
https://expo.dev/accounts/dharmendra_0/projects/urbannn/builds/

Look for the "Run gradlew" phase to see the exact error.
