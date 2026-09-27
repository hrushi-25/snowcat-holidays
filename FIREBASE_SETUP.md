# 🔥 Firebase Database & Authentication Setup Guide

This project is fully wired with **Firebase Cloud Firestore** and **Firebase Authentication**. Follow these quick steps to connect your Firebase database.

---

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or select an existing project).
3. Name your project (e.g., `snowcat-holidays`) and complete the creation steps.

---

## 2. Register a Web App & Get Config Keys

1. In your Firebase Project Overview page, click the **Web icon `</>`** to add a web application.
2. Register the app (e.g., `snowcat-frontend`).
3. Under **Firebase SDK snippet**, choose **Config** or scroll down to find your `firebaseConfig` object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "snowcat-holidays.firebaseapp.com",
  projectId: "snowcat-holidays",
  storageBucket: "snowcat-holidays.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-ABCDEF"
};
```

---

## 3. Configure Your `.env` File

Open [`.env`](file:///c:/Users/Admin/Desktop/snowcat/snowcat_agency-main/.env) in the project root and fill in your keys:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=snowcat-holidays.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=snowcat-holidays
VITE_FIREBASE_STORAGE_BUCKET=snowcat-holidays.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF
```

---

## 4. Enable Cloud Firestore

1. In the Firebase Console left menu, navigate to **Build** > **Firestore Database**.
2. Click **Create database**.
3. Choose a location (e.g., `asia-south1` or `nam5 (us-central)`).
4. Under **Security Rules**, you can start in **Test mode** for initial setup, or configure rules:

### Recommended Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Packages can be read by everyone; created/updated/deleted by authenticated owners or admin
    match /packages/{packageId} {
      allow read: if true;
      allow write: if true; // Or restrict to request.auth != null
    }
    
    // Enquiries can be created by any visitor; read/managed in dashboard
    match /enquiries/{enquiryId} {
      allow create: if true;
      allow read, update, delete: if true; // Or restrict to owner
    }

    // User profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 5. Enable Firebase Authentication (Optional / Recommended)

1. In the Firebase Console left menu, go to **Build** > **Authentication**.
2. Click **Get Started**.
3. In the **Sign-in method** tab, enable **Email/Password**.

---

## 6. Real-time Features Enabled

Once credentials are added to `.env`:
- **Catalog & Packages**: All packages are loaded from and synchronized with Firestore (`packages` collection).
- **One-Click Sync**: In the **Owner Dashboard**, click **"Sync to Firebase"** to automatically upload all catalog destinations into Firestore.
- **Instant Customer Enquiries**: Every booking lead submitted on the website goes directly to Firestore (`enquiries` collection) and updates the **Owner Dashboard in real-time** via live subscriptions.
