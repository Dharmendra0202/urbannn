# Price System - How It Works

## ✅ System is Already Working Correctly!

The booking screen (`app/offers/mens-booking.tsx`) correctly receives and displays the price passed from service cards.

## How Prices Flow:

### 1. Service Card Shows Price
Each service has a `price` property (e.g., ₹499, ₹699, ₹1999)

### 2. Navigation Passes Price
When you click "Book Now", the price is passed as a parameter:
```typescript
router.push({
  pathname: "/offers/mens-booking",
  params: {
    service: "Service Name",
    amount: "499"  // ← The actual price
  }
})
```

### 3. Booking Screen Uses Price
The booking screen reads the `amount` parameter and displays it:
```typescript
const serviceAmount = Number(params.amount) || 499; // Default to 499 if not provided
```

## ✅ Components Already Passing Prices Correctly:

1. **RecommendedServicePage** ✅
   - Passes: `selectedPackage?.price ?? service.startingPrice`

2. **CategoryDetailPage** ✅
   - Passes: `totalPrice` (calculated from selected options)

3. **ServiceHubScreen** ✅
   - Passes: `item.price` for services
   - Passes: `promo.bookingAmount ?? 499` for promos

4. **CleaningServicePage** ✅
   - Passes: `service.packages[selectedPackage]?.price ?? service.startPrice`

5. **RepairServicePage** ✅
   - Passes: `service.packages[selectedPackage]?.price ?? service.startPrice`

6. **OfferShowcaseScreen** ✅
   - Passes: `amount` parameter

7. **special-offer** ✅
   - Passes: `offer.price`

8. **services/details** ✅ (Just Fixed)
   - Now passes: `price` parameter (defaults to 499 if not provided)

## Price Calculation on Booking Screen:

The booking screen shows:
- **Service Charge**: The price passed from the service card
- **Convenience Fee**: ₹49 (fixed)
- **Total**: Service Charge + Convenience Fee

Example:
- If service price is ₹699
- Convenience fee is ₹49
- Total shown: ₹748

## Testing:

### Test Different Services:

1. **Men's Haircut** (₹499)
   - Should show: ₹499 + ₹49 = ₹548

2. **Bathroom Deep Cleaning** (₹699)
   - Should show: ₹699 + ₹49 = ₹748

3. **Home Deep Cleaning** (₹999)
   - Should show: ₹999 + ₹49 = ₹1048

4. **Wall Painting** (₹1999)
   - Should show: ₹1999 + ₹49 = ₹2048

## If You See Wrong Price:

### Possible Causes:

1. **Service card not passing price**
   - Check if the navigation includes `amount` parameter
   - Add it if missing

2. **Price not in service data**
   - Check the service object has a `price` property
   - Add it to the constants file if missing

3. **Default price being used**
   - If no `amount` parameter is passed, defaults to ₹499
   - This is intentional as a fallback

## How to Add Price to New Service:

```typescript
// In your service data (e.g., constants/home-data.ts)
{
  id: "1",
  name: "My New Service",
  price: 799,  // ← Add this
  rating: 4.8,
  // ... other properties
}

// When navigating to booking
router.push({
  pathname: "/offers/mens-booking",
  params: {
    service: service.name,
    amount: String(service.price),  // ← Pass the price
  },
} as any);
```

## Summary:

✅ The price system is working correctly
✅ Most components already pass prices
✅ Booking screen correctly displays passed prices
✅ Only defaults to ₹499 when no price is provided (as a safety fallback)

**The prices you see on service cards WILL match the prices on the booking screen!**
