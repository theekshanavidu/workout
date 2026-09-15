# 🏋️‍♂️ Theekshana // 3D Workout Suite & Progress Tracker

Modern, mobile-first 3D Machine & Free-Weight Workout Suite with persistent device caching (preserving API quota), dual Firebase Firestore sync, and 3-month progression analytics.

---

## 🌟 Key Highlights

- **🔒 Zero API Quota Waste (Persistent Device Cache)**:
  WorkoutX 3D GIF animations are fetched **only once** and cached permanently on the device via the Cache Storage API. Subsequent views load with **0 network requests (0 API quota used)**.
- **📱 Mobile-First Exclusive Accordion**:
  One exercise expanded at a time with prominent Sets × Reps volume badges, silent countdown timer, and in-place weight & reps logging.
- **💾 Dual Persistence**:
  Instant writes to browser `localStorage` + real-time cloud backup to Google Firebase Firestore.
- **📊 3-Month Progression Analytics**:
  Interactive Chart.js charts for every workout across Day 1, Day 2, and Day 3 tracking volume and weight progression over 12 weeks.
- **🛡️ 100% Secret-Safe for GitHub**:
  All API keys and credentials are stored strictly in `.env` (ignored by `.gitignore`). Sample templates provided in `.env.example`.
- **📱 PWA & Native Android Ready**:
  Includes `manifest.json`, Service Worker (`sw.js`), and a complete Android Studio project in the `android/` directory.

---

## 🚀 Getting Started

### 1. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials in `.env`:
```env
WORKOUTX_API_KEY=your_workoutx_api_key_here
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Start the Local Server
```bash
node server.mjs
```
Open your browser at:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 📱 PWA & Android App

- **Install as PWA**: Open in mobile Chrome/Safari, tap the browser menu, and tap **"Add to Home Screen"** or **"Install App"**.
- **Build Android APK**: Open the `android/` directory in **Android Studio** and click **Build > Build APK(s)**. See [`android/README.md`](android/README.md) for full instructions.

---

## 📁 Repository Structure

```
├── .env                  # Local secrets (NEVER committed to GitHub)
├── .env.example          # Template for GitHub
├── .gitignore            # Git ignore rules
├── index.html            # Main web application
├── app.js                # Core workout logic & Cache Storage manager
├── server.mjs            # Lightweight Node server with /env.js dynamic endpoint
├── manifest.json         # PWA Web App Manifest
├── sw.js                 # PWA Service Worker (Offline caching)
├── icon.svg              # Scalable SVG fitness app icon
├── android/              # Native Android Studio project
│   ├── app/              # Android app module (WebView, Manifest, icons)
│   ├── build.gradle      # Project gradle
│   └── settings.gradle   # Settings gradle
└── README.md             # Project documentation
```
