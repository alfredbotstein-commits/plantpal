# PlantPal — Design Specification
**"Water on time. Every time."**
*Design Director: Raphael | Division: Apps | QV Score: 8.0/10*
*Date: 2026-03-01*

---

## 1. Design Philosophy

PlantPal is calm, organic, and trustworthy. The entire UX communicates one thing: **we will remind you, and it will work.** Every interaction should feel like tending a garden — unhurried but purposeful. The app earns trust through reliability, not flash.

**Design Principles:**
1. **Reliability is visible.** Overdue states, next-water countdowns, and confirmation animations all reinforce that the system is working.
2. **One-thumb gardening.** Every critical action (mark watered, snooze, add plant) reachable with one hand.
3. **Delight in care.** The "watered!" moment is the emotional core — make it satisfying every single time.
4. **No clutter.** Free users see 5 plants max. Even power users rarely exceed 30. The UI never needs complex filtering or search within your collection.

---

## 2. Brand & Visual Language

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `green-600` | `#16A34A` | Primary action, healthy states, CTAs |
| `green-100` | `#DCFCE7` | Healthy plant card backgrounds |
| `amber-500` | `#F59E0B` | Due today / attention needed |
| `red-500` | `#EF4444` | Overdue indicators |
| `sky-500` | `#0EA5E9` | Water droplet accents, watered confirmation |
| `stone-50` | `#FAFAF9` | App background |
| `stone-800` | `#292524` | Primary text |
| `stone-400` | `#A8A29E` | Secondary text |

### Typography
- **Display/Headers:** SF Rounded Bold — warm, approachable
- **Body:** SF Pro Text Regular
- **Data/Countdowns:** SF Pro Rounded Medium (tabular figures)

### Iconography
- Rounded, 2px stroke, organic feel
- Custom icons: water droplet, leaf, sun, calendar, camera
- Status dots: green (healthy), amber (due today), red (overdue)

### Corner Radii
- Cards: 16px
- Buttons: 12px
- Input fields: 10px
- Thumbnails: 12px (plant photos), full-round (status dots)

### Shadows
- Cards: `0 1px 3px rgba(0,0,0,0.06)`
- Modals: `0 8px 32px rgba(0,0,0,0.12)`

---

## 3. App Icon

A single monstera leaf (simplified, geometric) with a water droplet at its base. Green gradient (`#16A34A` → `#22C55E`) on white. The leaf has 2-3 characteristic holes. Clean, recognizable at 29px. No text.

---

## 4. Screen Specifications

### 4.1 My Plants (Home Screen)

**Layout:** 2-column grid of plant cards. Pull-to-refresh. Sticky top bar.

**Top Bar:**
- Left: "PlantPal" in SF Rounded Bold, 20px
- Right: `+` button (green-600, 44×44pt tap target) → Add Plant flow

**Summary Banner** (top, below nav):
- Horizontal strip: `💧 2 need water today · 1 overdue`
- Tap → scrolls to first actionable plant
- Background: `green-100` normally, `amber-100` if due today, `red-100` if overdue

**Plant Card** (each cell):
```
┌─────────────────────┐
│  ┌───────────────┐  │
│  │               │  │
│  │  Plant Photo   │  │
│  │   (square)    │  │
│  │               │  │
│  └───────────────┘  │
│  ● Monstera         │  ← status dot + name (bold, 15px)
│  Water in 2 days    │  ← countdown (stone-400, 13px)
│  [💧 Water]         │  ← quick-action button (visible when due/overdue)
└─────────────────────┘
```

**Card States:**
- **Healthy (not due):** Green dot. "Water in X days." No action button.
- **Due Today:** Amber dot. "Water today!" Amber background tint. `💧 Water` button visible.
- **Overdue:** Red dot. Pulsing gently. "Overdue by X days" in red-500. `💧 Water` button prominent. Card border: 1px red-200.

**Empty State** (no plants added):
- Centered illustration: potted plant with dotted outline
- "Add your first plant" — 18px bold
- "We'll remind you exactly when to water." — 14px stone-400
- Large green CTA: "Add Plant" → Add Plant flow

**Free Limit State** (5 plants reached):
- `+` button still works but routes to soft paywall
- Bottom banner: "You've got 5 plants! Unlock unlimited for $2.99" with leaf icon

**Sorting:** Default by urgency (overdue first, then due today, then by next watering date ascending). No manual sort — the right plant is always on top.

---

### 4.2 Plant Detail

**Entry:** Tap any plant card from grid.

**Layout:** Scrollable single-column.

**Hero Section:**
- Full-width photo (16:10 ratio, rounded bottom corners 24px)
- Overlay gradient at bottom (black 0% → 60% opacity)
- Plant name over gradient, white, SF Rounded Bold 24px
- Species name below, white 70% opacity, 14px
- Back arrow top-left, edit (pencil) icon top-right

**Status Card** (below hero, overlapping hero by 20px):
```
┌──────────────────────────────┐
│  💧 Next watering            │
│  Tomorrow · Mar 2            │  ← large, bold
│  Every 7 days                │  ← secondary, stone-400
│                              │
│  [  💧 Mark as Watered  ]    │  ← full-width green button
│  [  ⏰ Snooze 1 day    ]    │  ← full-width outline button
└──────────────────────────────┘
```

**Care Info Section:**
- Light requirements: ☀️ icon + "Bright indirect"
- Humidity: 💨 icon + "Medium (40-60%)"
- Temperature: 🌡️ icon + "65-80°F"
- *Premium badge on species-specific data if not unlocked*

**Health Log:**
- Header: "Health Log" + `+` button
- Timeline of entries, newest first
- Each entry: date, icon (💧watered, 🌱repotted, 🐛pest, ✂️pruned, 📝note), description
- Watering entries auto-logged when user taps "Mark as Watered"

**Photo Timeline:**
- Horizontal scroll of dated thumbnails
- Tap → full-screen view with date overlay
- `📷 Add Photo` button at end of scroll
- *Premium: "Watch your plant grow" comparison slider between first and latest photo*

**Danger Zone** (bottom):
- "Delete Plant" in red-500, requires confirmation

---

### 4.3 Add Plant Flow

**Philosophy:** Get to the first reminder in under 30 seconds. Species lookup is optional — users can skip straight to custom schedule.

**Step 1: Name & Photo**
```
┌──────────────────────────────┐
│  ← Add Plant           1/3  │
│                              │
│     ┌──────────────┐        │
│     │  📷           │        │
│     │  Add Photo    │        │  ← tap for camera/library
│     └──────────────┘        │
│                              │
│  Plant Name                  │
│  ┌──────────────────────┐   │
│  │ My Monstera           │   │
│  └──────────────────────┘   │
│                              │
│  Location (optional)         │
│  [ Living Room ▼ ]          │  ← preset chips: Living Room, Bedroom,
│                              │    Kitchen, Bathroom, Office, Outdoor, Custom
│                              │
│  [  Next  ]                  │
└──────────────────────────────┘
```

**Step 2: Species Search**
```
┌──────────────────────────────┐
│  ← Add Plant           2/3  │
│                              │
│  What kind of plant?         │
│  ┌──────────────────────┐   │
│  │ 🔍 Search species...  │   │
│  └──────────────────────┘   │
│                              │
│  Popular:                    │
│  🌿 Monstera Deliciosa      │
│  🌵 Snake Plant              │
│  🪴 Pothos                   │
│  🌸 Peace Lily               │
│  🌿 Fiddle Leaf Fig          │
│  🌵 Aloe Vera               │
│                              │
│  [ Skip — I'll set my own ]  │  ← stone-400 text link
│  [  Next  ]                  │
└──────────────────────────────┘
```

- Search is instant, fuzzy-matched against local database of ~500 common species
- Selecting a species auto-fills watering frequency, light, humidity in step 3
- Skip goes to step 3 with manual entry

**Step 3: Watering Schedule**
```
┌──────────────────────────────┐
│  ← Add Plant           3/3  │
│                              │
│  How often should we         │
│  remind you?                 │
│                              │
│  Every [ 7 ▼ ] days         │  ← picker: 1-60 days
│                              │
│  ☀️ Summer: every 5 days     │  ← shown if species selected
│  ❄️ Winter: every 10 days    │  ← (premium badge if locked)
│                              │
│  Remind me at                │
│  [ 9:00 AM ▼ ]              │
│                              │
│  First watering              │
│  ( ● ) Today                 │
│  (   ) Tomorrow              │
│  (   ) In [X] days           │
│                              │
│  [  Done — Add Plant 🌱  ]   │  ← green, celebratory
└──────────────────────────────┘
```

**Post-Add Celebration:**
- Full-screen confetti of leaves + water droplets, 1.5 seconds
- Plant card flies into position on the grid
- Haptic: success pattern
- If first plant: "Nice! We'll send your first reminder on [date]."

---

### 4.4 Watering Schedule (Calendar View)

**Entry:** Tab bar "Schedule" icon.

**Layout:** Weekly calendar strip at top + daily list below.

**Calendar Strip:**
- Horizontal scroll, current week centered
- Each day: date number + dot indicators (green = watered, amber = due, red = overdue, gray = nothing)
- Today highlighted with green-600 circle

**Day List** (below calendar):
```
── Today, Mar 1 ──────────────
🌿 Monstera        💧 Water    ← swipe-right to mark watered
🌵 Snake Plant     💧 Water

── Tomorrow, Mar 2 ────────────
🪴 Pothos          ⏳ Due

── Wed, Mar 3 ─────────────────
   Nothing scheduled 🌿
```

- Each row: plant thumbnail (24px circle), name, action button
- Swipe right on row → "Watered!" with checkmark animation
- Swipe left → Snooze options (1 day, 3 days, custom)
- Past days show completion status (✅ watered on time, ❌ missed, ⏰ late)

---

### 4.5 "Watered!" Confirmation (The Money Moment)

This is the single most important micro-interaction in the app. It must feel **satisfying every single time** — this is what builds the daily habit.

**Trigger:** Tap "Mark as Watered" or swipe-right on schedule row.

**Animation Sequence (800ms total):**
1. Button morphs into water droplet (150ms)
2. Droplet falls onto plant card/row (200ms, spring ease)
3. Splash effect — 5-8 smaller droplets radiate outward (150ms)
4. Plant card briefly glows sky-100 (200ms fade)
5. Status dot transitions green with scale bounce (100ms)
6. Checkmark appears with gentle rotation (100ms)

**Haptic:** Medium impact on droplet fall + light success on checkmark.

**Sound:** Optional soft water drop sound (respect silent mode). Toggleable in settings.

**Counter update:** "Water in X days" updates in real-time with number roll animation.

---

### 4.6 Notification System

**This is the product's reason to exist. Notifications MUST fire reliably.**

**Technical Requirements:**
- Use `UNUserNotificationCenter` with explicit time-interval triggers (not calendar-based — fewer iOS quirks)
- Schedule next 64 notifications at app launch (iOS limit)
- Re-schedule on every app open (covers edge cases)
- Background app refresh to re-register if needed
- Local notifications ONLY (no server dependency = no failure point)

**Notification Content:**
- **Title:** "💧 Time to water [Plant Name]!"
- **Body:** "Your [species] in the [location] is thirsty."
- **Actions:** "Watered ✅" | "Snooze 1 day ⏰"
- **Category:** Actionable notification — user can mark watered directly from lock screen

**Snooze Logic:**
- Snooze from notification → reschedules +24 hours
- Snooze from app → picker: 1 day, 3 days, 1 week, custom
- Max 3 snoozes before notification text changes: "Your [plant] is REALLY thirsty! 🥺"

**Overdue Escalation:**
- Day 1 overdue: Standard reminder, amber badge
- Day 3 overdue: "Don't forget [plant]! It's been [X] days." Red badge.
- Day 7 overdue: "Is [plant] OK? Last watered [X] days ago." Persistent badge remains.
- No further escalation (don't guilt-trip into uninstall)

**Onboarding Notification Permission:**
- Requested at end of Add Plant flow (not app launch)
- Context: "PlantPal needs notifications to remind you when to water. That's... kind of the whole point. 🌱"
- If denied: Banner in-app on My Plants screen with re-request deep link to Settings

---

### 4.7 Settings

**Sections:**

**Notifications**
- Reminder time (default 9:00 AM)
- Sound on/off
- Overdue reminders on/off

**Display**
- Dark mode (auto/light/dark)
- App icon (green default, dark, terracotta — premium)

**Data**
- Export plant data (JSON)
- Import from backup

**Premium**
- Current status
- Restore purchase

**About**
- Version, rate app, contact support, privacy policy

---

### 4.8 Premium Upgrade (Soft Paywall)

**Triggers:**
- Adding 6th plant (hard gate)
- Tapping locked care guides
- Tapping seasonal adjustment toggle
- Tapping health insights
- Settings → Premium

**Paywall Screen:**
```
┌──────────────────────────────┐
│           🌿                 │
│    Grow your collection      │
│                              │
│  ✅ Unlimited plants         │
│  ✅ Species care guides      │
│  ✅ Seasonal adjustments     │
│  ✅ Plant health insights    │
│  ✅ Custom app icons         │
│                              │
│  ┌──────────────────────┐   │
│  │  Unlock All — $2.99  │   │  ← green, large
│  │    One-time purchase  │   │
│  └──────────────────────┘   │
│                              │
│  No subscription. Ever. 🎉  │  ← key differentiator callout
│                              │
│  [ Restore Purchase ]        │
└──────────────────────────────┘
```

**"No subscription. Ever."** is the single most important line on this screen. It directly addresses the QV pain point. Make it prominent.

---

## 5. Navigation

**Tab Bar (4 tabs):**

| Icon | Label | Screen |
|------|-------|--------|
| 🌿 | My Plants | Plant grid (home) |
| 📅 | Schedule | Calendar/list view |
| ➕ | Add | Add Plant flow (raised center button, green-600 circle) |
| ⚙️ | Settings | Settings |

- The `+` tab is a raised circular button, 56px, centered, green-600 with white plus icon
- Active tab: green-600 icon + label. Inactive: stone-400.

---

## 6. Onboarding (First Launch)

Three quick screens, swipeable, skip available:

**Screen 1:** Illustration of phone with plant notification
- "Never forget to water again."

**Screen 2:** Illustration of plant grid with status dots
- "Track all your plants in one place."

**Screen 3:** Illustration of watering can with sparkles
- "Species-specific care. No subscription."

**CTA on final screen:** "Add Your First Plant 🌱" → Add Plant flow

Total onboarding: <15 seconds. No signup. No account. Straight to value.

---

## 7. Dark Mode

- Background: `stone-950` (#0C0A09)
- Cards: `stone-900` (#1C1917)
- Primary text: `stone-100` (#F5F5F4)
- Green stays `green-500` (#22C55E) — slightly lighter for contrast
- Status colors unchanged
- Plant photos get subtle vignette overlay for visual consistency

---

## 8. Data Model (For Ezra)

```
Plant {
  id: UUID
  name: String
  species: String?           // from local database
  location: String?          // "Living Room", etc.
  photoURLs: [String]        // local file paths
  wateringIntervalDays: Int  // user-set or species default
  summerIntervalDays: Int?   // premium, species-based
  winterIntervalDays: Int?   // premium, species-based
  reminderTime: Time         // default from settings
  lastWateredDate: Date?
  nextWateringDate: Date     // computed
  createdAt: Date
  healthLog: [HealthEntry]
}

HealthEntry {
  id: UUID
  date: Date
  type: enum(watered, repotted, pest, pruned, fertilized, note)
  note: String?
  photoURL: String?
}

Settings {
  defaultReminderTime: Time  // 9:00 AM
  soundEnabled: Bool
  overdueRemindersEnabled: Bool
  darkMode: enum(auto, light, dark)
  isPremium: Bool
}
```

All data stored locally via SwiftData. No backend. No account. No sync (V1). This is a feature — zero points of failure for notifications.

---

## 9. Species Database

Bundle ~500 common houseplant species as a local JSON file. Fields per species:

```json
{
  "commonName": "Monstera Deliciosa",
  "scientificName": "Monstera deliciosa",
  "wateringDays": 7,
  "summerWateringDays": 5,
  "winterWateringDays": 10,
  "light": "Bright indirect",
  "humidity": "Medium (40-60%)",
  "tempMin": 65,
  "tempMax": 80,
  "careNotes": "Let top inch of soil dry between waterings. Yellow leaves = overwatering.",
  "icon": "monstera"
}
```

Source data from public horticultural databases. Ship with app, no network dependency.

---

## 10. Accessibility

- All tap targets ≥ 44×44pt
- VoiceOver labels on all icons and status indicators
- "Overdue by 3 days" announced, not just color change
- Dynamic Type support on all text
- Reduce Motion: replace confetti/splash with simple checkmark fade
- High contrast mode: status dots get borders + text labels

---

## 11. Performance Targets

- Cold launch to My Plants grid: < 1 second
- Add Plant flow completion: < 30 seconds (user time)
- Notification delivery: within 60 seconds of scheduled time
- App size: < 25 MB (including species database)
- Memory: < 50 MB active

---

## 12. Competitive Positioning Summary

| Pain Point (from QV research) | PlantPal Solution |
|-------------------------------|-------------------|
| Notifications don't fire reliably | Local-only, re-registered every launch, 64-notification buffer |
| Subscription fatigue ($36/yr) | One-time $2.99 premium. "No subscription. Ever." |
| Generic schedules ignore species | 500-species local database with seasonal adjustments |
| Overcomplicated UX | 3-step add flow, one-thumb watering, zero accounts |
| No habit reinforcement | Satisfying watered animation + streak potential (V2) |

---

*End of spec. Ready for Ezra to build.*
