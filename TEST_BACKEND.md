# Test Your Deployed Backend

Your backend is now live at: **https://urbannn-server.vercel.app**

## Quick Tests

### 1. Health Check
Open in browser:
```
https://urbannn-server.vercel.app/health
```

Should return:
```json
{"status":"ok","timestamp":"2024-..."}
```

### 2. Get Services
```
https://urbannn-server.vercel.app/api/services
```

Should return your services list with 16 services.

### 3. Get Categories
```
https://urbannn-server.vercel.app/api/services/categories
```

Should return 5 categories.

## What I Updated

1. **lib/api.ts** - Changed API_URL from `http://192.168.0.100:3001/api` to `https://urbannn-server.vercel.app/api`
2. **app/offers/mens-booking.tsx** - Updated both fetch URLs to use Vercel deployment

## Next Step: Rebuild APK

Now that your backend is deployed and the app is configured to use it, rebuild your APK:

```bash
eas build -p android --profile preview
```

This new APK will work:
- ✅ On any WiFi network
- ✅ When you're not home
- ✅ For other people to use
- ✅ From anywhere in the world

The backend is now globally accessible!
