# 📱 Android Application Setup Guide

This directory contains the complete, native Android Studio project for **Theekshana // 3D Workout Suite**.

---

## 🛠️ Requirements
- [Android Studio](https://developer.android.com/studio) (Hedgehog, Iguana, or later)
- Android SDK (API Level 24 to 34)
- Java JDK 17 (bundled with Android Studio)

---

## 🚀 Quick Start (Opening in Android Studio)

1. Open **Android Studio**.
2. Click **Open** and select the `d:\SE\My\android` folder.
3. Allow Gradle to sync dependencies automatically.

---

## 🌐 Configuring the App URL

Open `android/app/src/main/java/com/theekshana/workoutsuite/MainActivity.java`:

- **For Android Emulator (Testing local server on development PC)**:
  ```java
  private static final String APP_URL = "http://10.0.2.2:5173/";
  ```
  *(Android Emulator maps `10.0.2.2` directly to `localhost` on your Windows PC)*

- **For Real Physical Android Device on same Wi-Fi**:
  ```java
  private static final String APP_URL = "http://YOUR_PC_LOCAL_IP:5173/";
  ```
  *(Example: `http://192.168.1.100:5173/`)*

- **For Production Deployed URL (Firebase Hosting, Vercel, etc.)**:
  ```java
  private static final String APP_URL = "https://your-workout-suite.web.app/";
  ```

---

## 📦 Building the APK

In Android Studio:
- Go to menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- Once finished, click **locate** to find `app-debug.apk` and install it on any Android phone!
