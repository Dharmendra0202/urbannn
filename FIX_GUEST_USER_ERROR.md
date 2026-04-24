# Fix: Guest User Not Found Error

## Error Message
```
Booking Failed
Guest user not found. Please run: node backend/create-guest-user.js
```

## Why This Happens

When users browse your app **without logging in** (as guests), the app tries to create bookings using a special "Guest User" account. This guest user must exist in your database, but it's not there yet.

## Solution: Create the Guest User

### Option 1: Run the Script Locally (If backend is on your computer)

```bash
cd backend
node init-guest-user.js
```

You should see:
```
✅ Guest user created!
✅ Guest address created!
✅ Initialization complete!
```

### Option 2: Run Directly in Supabase (If backend is deployed)

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run this SQL:

```sql
-- Create guest user
INSERT INTO users (id, phone, full_name, email)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '0000000000',
  'Guest User',
  'guest@urbannn.app'
)
ON CONFLICT (id) DO NOTHING;

-- Create guest address
INSERT INTO user_addresses (user_id, address_type, address_line1, city, state, pincode, is_default)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'home',
  'Guest Address',
  'Mumbai',
  'Maharashtra',
  '400001',
  true
)
ON CONFLICT DO NOTHING;
```

5. Click **Run** or press `Ctrl+Enter`

### Option 3: Run via Backend API (If you have access)

If your backend is deployed and running, you can create an endpoint to initialize the guest user, or run the script on your server.

## Verify It Worked

1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Open the `users` table
4. Look for a user with:
   - ID: `00000000-0000-0000-0000-000000000001`
   - Phone: `0000000000`
   - Name: `Guest User`

## After Creating Guest User

1. **Restart your app** (if running)
2. **Try booking again** as a guest
3. The error should be gone!

## Alternative: Require Login

If you don't want to support guest bookings, you can:

1. **Force users to login** before booking
2. **Remove guest mode** from the app
3. **Show login screen** when user tries to book

To do this, modify your booking flow to check if user is authenticated:

```typescript
// In your booking component
const { user } = useAuth();

const handleBooking = () => {
  if (!user) {
    Alert.alert(
      'Login Required',
      'Please login to book services',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => router.push('/auth/login') }
      ]
    );
    return;
  }
  
  // Continue with booking...
};
```

## Technical Details

### Guest User ID
- Fixed UUID: `00000000-0000-0000-0000-000000000001`
- This special ID is used throughout the app for guest bookings

### What Gets Created
1. **Guest User** in `users` table
2. **Guest Address** in `user_addresses` table
3. Both are linked and ready for bookings

### Security Note
Guest bookings are tracked separately and can be:
- Limited in features
- Converted to real user bookings after signup
- Cleaned up periodically

---

**Status**: Follow one of the options above to fix the error
**Priority**: High - Blocks guest users from booking
**Time to Fix**: 2-5 minutes
