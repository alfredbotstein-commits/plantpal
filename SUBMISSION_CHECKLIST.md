# PlantPal — Submission Checklist

## Build
- [x] `npm run build` passes with 0 errors
- [x] Vite + React 18 + Capacitor 5 + Dexie stack
- [x] AAB built: `android/app/build/outputs/bundle/release/app-release.aab` (4.2 MB)
- [x] Bundle size: 372 KB (dist), 110 KB gzipped JS

## Screens Built
- [x] Onboarding (3 swipeable screens + skip)
- [x] My Plants (2-column grid, sorted by urgency)
- [x] Plant Detail (hero, status card, care info, health log, delete)
- [x] Add Plant (3-step flow: name → species → schedule)
- [x] Edit Plant (name, location, interval)
- [x] Watering Schedule (14-day calendar strip + daily list)
- [x] Settings (notifications, display, data, premium, about)
- [x] Premium Paywall ($2.99 one-time)

## Features
- [x] 500+ species local JSON database
- [x] Fuzzy species search
- [x] Watering reminders with status tracking (healthy/due/overdue)
- [x] Mark as watered with animation
- [x] Snooze functionality (1 day, 3 days, 1 week)
- [x] Health log (watered, repotted, pest, pruned, fertilized, notes)
- [x] Confetti animation on plant add
- [x] Data export/import (JSON)
- [x] Dark mode (auto/light/dark)

## A1 Self-QA Audit
- [x] ErrorBoundary wraps entire app
- [x] aria-labels on all interactive elements
- [x] 0 console.log statements in source
- [x] 0 hardcoded API keys
- [x] Onboarding flow works (3 screens + skip)
- [x] Premium gates enforced (5 plant limit, seasonal data, care guides)
- [x] 56px+ tap targets on all buttons
- [x] Tab bar navigation works correctly

## A3 Code Audit
- [x] All data local-only (Dexie/IndexedDB)
- [x] Cascade deletes (deleting plant removes all health entries)
- [x] Input validation (name required, interval 1-60, maxLength on text inputs)
- [x] Premium enforcement: plant limit, premium badges, paywall routing
- [x] No external API calls
- [x] No user tracking or analytics

## A4 Submission Prep
- [x] STORE_LISTING.md written
- [x] PRIVACY_POLICY.md written
- [x] SUBMISSION_CHECKLIST.md written (this file)

## Scott Needs To
1. **Sign the AAB** with upload keystore for Google Play
2. **Create Google Play listing** with store listing copy from STORE_LISTING.md
3. **Take screenshots** on device/emulator for store listing (phone + tablet)
4. **Set up Google Play Billing** for $2.99 premium IAP product ID
5. **Configure RevenueCat** (or direct billing) for production premium flow
6. **Submit to Google Play Console**
