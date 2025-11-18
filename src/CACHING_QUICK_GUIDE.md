# Caching Quick Reference Guide

## 🚀 Quick Start

The VendorsDirectory page now has smart caching built-in. Here's what you need to know:

### What's Cached?
- ✅ API responses from WordPress GeoDirectory
- ✅ Current page number
- ✅ Scroll position on the page
- ✅ Active filters and search terms

### Cache Duration
- **API Data:** 10 minutes (localStorage)
- **Page State:** Until browser tab closes (sessionStorage)

---

## 🎯 How It Works

### When You First Visit `/vendors/`
1. App checks localStorage for cached data
2. If cache exists and is fresh (< 10 minutes old), uses cached data
3. If no cache or expired, fetches fresh data from API
4. Stores the response in localStorage with timestamp

### When You Navigate Away and Come Back
1. Your scroll position is restored
2. The same page number you were on is loaded
3. If cache is still valid, no API call is made
4. Everything appears instantly!

---

## 🔄 Manual Cache Management

### Clear All Cache
Open browser console (F12) and run:
```javascript
localStorage.removeItem('vendorsCache');
sessionStorage.removeItem('vendorsPageState');
```

### Check Cache Status
```javascript
// Check if cache exists
const cache = localStorage.getItem('vendorsCache');
console.log('Cache exists:', !!cache);

// Check cache age
if (cache) {
  const data = JSON.parse(cache);
  const age = Date.now() - data.timestamp;
  console.log('Cache age (minutes):', Math.floor(age / 60000));
}
```

### Force Fresh Data
```javascript
// Clear cache and reload
localStorage.removeItem('vendorsCache');
location.reload();
```

---

## 📊 Cache Performance

### Benefits
- ⚡ **Instant page loads** when cache is valid
- 💰 **Reduced API calls** = lower server costs
- 🌐 **Works offline** for 10 minutes after last visit
- 📱 **Better mobile experience** with less data usage

### When Cache is Bypassed
- After 10 minutes of inactivity
- When you manually clear browser storage
- When localStorage is full (very rare)

---

## 🛠️ Developer Notes

### File Location
`/pages/VendorsDirectory.tsx`

### Key Functions
- `getCachedVendors()` - Retrieves cached data
- `setCachedVendors()` - Stores data with timestamp
- `savePageState()` - Saves scroll position and page number
- `restorePageState()` - Restores user's previous state

### Cache Keys
- `vendorsCache` - Stores API response data
- `vendorsPageState` - Stores UI state (page, scroll)

---

## ⚙️ Customization

Want to change cache duration? Edit line ~60 in `/pages/VendorsDirectory.tsx`:

```typescript
// Current: 10 minutes
const CACHE_DURATION = 10 * 60 * 1000;

// Change to 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

// Change to 1 hour
const CACHE_DURATION = 60 * 60 * 1000;
```

---

## 🐛 Troubleshooting

### Old data showing up?
Clear the cache:
```javascript
localStorage.removeItem('vendorsCache');
```

### Page state not restoring?
Check sessionStorage:
```javascript
console.log(sessionStorage.getItem('vendorsPageState'));
```

### Want to disable caching temporarily?
Comment out the cache check in `VendorsDirectory.tsx`:
```typescript
// const cachedData = getCachedVendors();
// if (cachedData) {
//   setVendors(cachedData);
//   return;
// }
```

---

## 📈 Monitoring

### Track Cache Hit Rate
Add this to your analytics:
```typescript
const cacheHit = !!getCachedVendors();
console.log('Cache hit:', cacheHit);
// Send to your analytics platform
```

---

For detailed technical documentation, see `/CACHING_SYSTEM.md`
