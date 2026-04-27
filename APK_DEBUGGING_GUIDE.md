# 🐛 APK Debugging Guide

## ✅ Changes Made to Fix APK Issues

### 1. Network Configuration
- Added `usesCleartextTraffic: false` to enforce HTTPS
- Added `networkSecurityConfig` to Android settings
- Ensures secure connections in production builds

### 2. Enhanced Error Handling
- Added network connectivity test before booking
- Better error messages for different failure types
- Console logging for debugging

### 3. Error Messages Now Show:
- "No Internet Connection" - if network test fails
- "Network error" - if fetch fails
- "Cannot connect to server" - if backend unreachable
- Specific error from backend - if API returns error

## 🔍 How to Debug APK Issues

### Method 1: Using Android Logcat (Recommended)

1. **Connect phone via USB**
2. **Enable USB Debugging** on phone
3. **Run logcat**:
   ```bash
   adb logcat | grep -i "urbannn\|ReactNativeJS"
   ```

4. **Open app and try booking**
5. **Watch console logs** - you'll see:
   - "Confirm button pressed!"
   - "Testing network connectivity..."
   - "Creating booking..."
   - Any errors

### Method 2: Using React Native Debugger

1. **Shake phone** to open dev menu
2. **Enable "Debug"** (only works in dev builds)
3. **Open Chrome DevTools**
4. **Check console** for errors

### Method 3: Check Network Manually

Test if backend is accessible from phone:

```bash
# From your computer, test backend
curl https://urbannn-server.vercel.app/health

# Should return: {"status":"ok","timestamp":"..."}
```

## 🔧 Common APK Issues & Fixes

### Issue 1: Button Does Nothing
**Symptoms**: Button press has no effect
**Causes**:
- Form validation failing
- Network blocked
- JavaScript error

**Fix**:
- Check bottom text shows "✓ Ready to book"
- Check internet connection
- View logcat for errors

### Issue 2: "Network Error"
**Symptoms**: Alert shows network error
**Causes**:
- No internet connection
- Backend down
- DNS issues

**Fix**:
```bash
# Test from phone browser
# Open: https://urbannn-server.vercel.app/health
# Should show: {"status":"ok"}
```

### Issue 3: "Cannot Connect to Server"
**Symptoms**: Fetch fails immediately
**Causes**:
- Firewall blocking
- VPN interfering
- Wrong URL

**Fix**:
- Disable VPN
- Check WiFi/mobile data
- Verify backend URL in code

### Issue 4: Button Stays "Processing..."
**Symptoms**: Loading state never clears
**Causes**:
- Backend timeout
- Supabase paused
- API error

**Fix**:
- Check Vercel logs
- Verify Supabase is active
- Check backend health endpoint

## 📱 Testing Checklist

Before reporting issues, test these:

- [ ] Phone has internet (open browser, visit google.com)
- [ ] Backend is up (visit https://urbannn-server.vercel.app/health)
- [ ] Supabase is active (not paused)
- [ ] All form fields filled correctly
- [ ] Bottom text shows "✓ Ready to book"
- [ ] USB debugging enabled (for logs)

## 🚀 Rebuild APK with Fixes

Since you made changes, rebuild the APK:

```bash
# Increment version
# Edit app.json: "versionCode": 2

# Build new APK
eas build --platform android --profile preview
```

## 📊 View Logs in Real APK

### Enable Logging in Production

Add this to see logs in production APK:

```bash
# Connect phone via USB
adb devices

# View all logs
adb logcat

# Filter for your app
adb logcat | grep "com.dharmendra_0.urbannn"

# Filter for React Native
adb logcat | grep "ReactNativeJS"
```

### What to Look For:

```
✅ Good logs:
ReactNativeJS: Confirm button pressed!
ReactNativeJS: Testing network connectivity...
ReactNativeJS: Network test response: 200
ReactNativeJS: Creating booking...
ReactNativeJS: Step 1: Creating address...
ReactNativeJS: Address response status: 201

❌ Bad logs:
ReactNativeJS: Network test failed: TypeError: Network request failed
ReactNativeJS: Error details: Cannot connect to server
```

## 🔐 Security Notes

Your APK now:
- ✅ Only allows HTTPS connections
- ✅ Blocks cleartext (HTTP) traffic
- ✅ Has proper network permissions
- ✅ Tests connectivity before API calls

## 💡 Pro Tips

1. **Always test on real device** - emulators behave differently
2. **Check backend first** - most issues are backend/network
3. **Use logcat** - it shows everything
4. **Test with WiFi AND mobile data** - different networks behave differently
5. **Clear app data** - sometimes cached data causes issues

## 🆘 Still Not Working?

If booking still fails in APK:

1. **Get logs**:
   ```bash
   adb logcat > apk-logs.txt
   # Try booking
   # Ctrl+C to stop
   # Check apk-logs.txt
   ```

2. **Check these**:
   - Is backend URL correct? (https://urbannn-server.vercel.app)
   - Is Supabase active? (not paused)
   - Does phone have internet?
   - Are there any firewall/VPN issues?

3. **Test backend directly**:
   ```bash
   curl -X POST https://urbannn-server.vercel.app/api/bookings/guest/address \
     -H "Content-Type: application/json" \
     -d '{"full_name":"Test","phone":"9999999999","address_line1":"Test Address","city":"Mumbai","state":"Maharashtra","pincode":"400001"}'
   ```

## 📝 Next Steps

1. Rebuild APK with new changes
2. Install on phone
3. Enable USB debugging
4. Run logcat while testing
5. Share logs if issues persist
