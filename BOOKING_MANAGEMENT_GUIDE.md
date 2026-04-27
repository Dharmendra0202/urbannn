# 📋 Booking Management Guide

## ✅ What's Already Working

All bookings from your APK are **automatically stored** in Supabase database with:
- Customer details
- Service information
- Date & time
- Payment status
- Provider assignment
- Booking history

## 📊 View All Bookings

### Method 1: Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/zzamwulthzpjzsmlzilp/editor
2. Click **"bookings"** table
3. See all bookings with full details
4. Filter, sort, search as needed

### Method 2: API Endpoint

```bash
# Get all bookings
curl https://urbannn-server.vercel.app/api/admin/bookings

# Get bookings by status
curl https://urbannn-server.vercel.app/api/admin/bookings?status=completed

# Get bookings by date range
curl https://urbannn-server.vercel.app/api/admin/bookings?date_from=2026-04-01&date_to=2026-04-30

# Get booking statistics
curl https://urbannn-server.vercel.app/api/admin/bookings/stats
```

### Method 3: Admin Dashboard (In App)

- Login to admin panel
- View bookings section
- See all bookings with details

## 🗑️ Delete Old Bookings

### Option A: Automatic Cleanup (Recommended)

Delete completed bookings older than 90 days:

```bash
curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup \
  -H "Content-Type: application/json" \
  -d '{"days": 90, "status": "completed"}'
```

**Parameters:**
- `days`: Number of days (default: 90)
- `status`: Booking status to delete (default: "completed")

**Examples:**

```bash
# Delete completed bookings older than 30 days
curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup \
  -H "Content-Type: application/json" \
  -d '{"days": 30, "status": "completed"}'

# Delete cancelled bookings older than 60 days
curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup \
  -H "Content-Type: application/json" \
  -d '{"days": 60, "status": "cancelled"}'
```

### Option B: Delete Specific Booking

```bash
curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/BOOKING_ID
```

### Option C: Manual Delete (Supabase)

1. Go to Supabase dashboard
2. Open "bookings" table
3. Select bookings to delete
4. Click delete button

## 📈 Booking Statistics

Get overview of all bookings:

```bash
curl https://urbannn-server.vercel.app/api/admin/bookings/stats
```

**Returns:**
```json
{
  "total": 150,
  "today": 5,
  "thisMonth": 45,
  "byStatus": {
    "pending": 10,
    "confirmed": 20,
    "in_progress": 5,
    "completed": 100,
    "cancelled": 15
  }
}
```

## 📥 Export Bookings

Download all bookings as CSV:

```bash
curl https://urbannn-server.vercel.app/api/admin/bookings/export/csv > bookings.csv
```

Or open in browser:
```
https://urbannn-server.vercel.app/api/admin/bookings/export/csv
```

## 🔄 Update Booking Status

```bash
# Mark as completed
curl -X PATCH https://urbannn-server.vercel.app/api/admin/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Cancel booking
curl -X PATCH https://urbannn-server.vercel.app/api/admin/bookings/BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "cancelled", "cancellation_reason": "Customer request"}'
```

## 🤖 Automated Cleanup (Cron Job)

### Option 1: Manual Cron (Your Server)

Add to crontab to run daily at 2 AM:

```bash
0 2 * * * curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup -H "Content-Type: application/json" -d '{"days": 90, "status": "completed"}'
```

### Option 2: Vercel Cron (Recommended)

Create `vercel.json` in backend:

```json
{
  "crons": [{
    "path": "/api/admin/bookings/cleanup",
    "schedule": "0 2 * * *"
  }]
}
```

### Option 3: GitHub Actions

Create `.github/workflows/cleanup-bookings.yml`:

```yaml
name: Cleanup Old Bookings
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:  # Manual trigger

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Delete old bookings
        run: |
          curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup \
            -H "Content-Type: application/json" \
            -d '{"days": 90, "status": "completed"}'
```

## 📊 Booking Data Structure

Each booking contains:

```json
{
  "id": "uuid",
  "booking_number": "URB20260427000041",
  "user_id": "uuid",
  "service_id": "uuid",
  "provider_id": "uuid",
  "address_id": "uuid",
  "scheduled_date": "2026-04-28",
  "scheduled_time": "09:00:00",
  "duration_minutes": 45,
  "base_price": 399,
  "discount_amount": 79.8,
  "tax_amount": 57.46,
  "total_amount": 376.66,
  "status": "confirmed",
  "payment_status": "pending",
  "special_instructions": "Customer notes",
  "created_at": "2026-04-27T14:22:02.451148+00:00",
  "updated_at": "2026-04-27T14:22:02.451148+00:00"
}
```

## 🔐 Security Notes

**Important:** Add authentication to admin routes in production!

```javascript
// Add middleware to admin.routes.js
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');

router.use(authenticate);
router.use(requireAdmin);
```

## 📝 Best Practices

### Retention Policy

Recommended retention periods:

- **Pending bookings**: Keep for 30 days
- **Confirmed bookings**: Keep for 90 days
- **Completed bookings**: Keep for 90 days
- **Cancelled bookings**: Keep for 60 days

### Cleanup Schedule

Run cleanup:
- **Daily**: Delete very old bookings (>180 days)
- **Weekly**: Delete completed bookings (>90 days)
- **Monthly**: Archive important bookings before deletion

### Backup Before Deletion

Always backup before bulk deletion:

```bash
# Export to CSV first
curl https://urbannn-server.vercel.app/api/admin/bookings/export/csv > backup-$(date +%Y%m%d).csv

# Then cleanup
curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup \
  -H "Content-Type: application/json" \
  -d '{"days": 90, "status": "completed"}'
```

## 🚀 Deploy Changes

To activate the new admin routes:

```bash
cd backend
git add .
git commit -m "Add admin booking management routes"
git push
```

Vercel will auto-deploy in ~2 minutes.

## 📞 Quick Commands

```bash
# View all bookings
curl https://urbannn-server.vercel.app/api/admin/bookings

# Get stats
curl https://urbannn-server.vercel.app/api/admin/bookings/stats

# Delete old bookings (90+ days)
curl -X DELETE https://urbannn-server.vercel.app/api/admin/bookings/cleanup \
  -H "Content-Type: application/json" \
  -d '{"days": 90, "status": "completed"}'

# Export to CSV
curl https://urbannn-server.vercel.app/api/admin/bookings/export/csv > bookings.csv
```

## ✅ Summary

- ✅ All bookings automatically stored in database
- ✅ View bookings via Supabase dashboard
- ✅ API endpoints for management
- ✅ Automatic cleanup available
- ✅ Export to CSV
- ✅ Update booking status
- ✅ Delete specific or bulk bookings

Your booking management system is ready to use!
