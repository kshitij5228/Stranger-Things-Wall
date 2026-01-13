# 🔐 Firebase Security Setup Guide

## Step 1: Set Firebase Realtime Database Rules

Go to Firebase Console → Realtime Database → Rules and paste this:

```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        // Allow read/write only if session ID format is valid (UUID or timestamp-based)
        ".read": "$sessionId.matches(/^[a-zA-Z0-9-]{8,50}$/)",
        ".write": "$sessionId.matches(/^[a-zA-Z0-9-]{8,50}$/)",
        
        "letters": {
          "$letterId": {
            ".validate": "newData.hasChildren(['letter', 'timestamp']) && 
                          newData.child('letter').isString() && 
                          newData.child('letter').val().length == 1 &&
                          newData.child('letter').val().matches(/^[A-Z]$/) &&
                          newData.child('timestamp').isNumber()"
          }
        },
        
        "createdAt": {
          ".validate": "newData.isNumber()"
        },
        
        "active": {
          ".validate": "newData.isBoolean()"
        }
      }
    },
    
    // Block all other paths
    ".read": false,
    ".write": false
  }
}
```

## Step 2: Enable App Check (Recommended)

1. Go to Firebase Console → App Check
2. Register your app with reCAPTCHA v3
3. Enable enforcement for Realtime Database

## Step 3: Restrict API Key (Google Cloud Console)

1. Go to https://console.cloud.google.com/apis/credentials
2. Find your Firebase API key
3. Under "Application restrictions":
   - Select "HTTP referrers (websites)"
   - Add your domains:
     - `your-domain.com/*`
     - `*.your-domain.com/*`
     - `localhost:*` (for development)

4. Under "API restrictions":
   - Select "Restrict key"
   - Enable only these APIs:
     - Firebase Realtime Database API
     - Identity Toolkit API (if using Auth)

## Step 4: Create .env File

Create `.env` file in project root (NEVER commit this!):

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 5: Hosting Platform Environment Variables

### Vercel:
- Go to Project Settings → Environment Variables
- Add all VITE_FIREBASE_* variables

### Netlify:
- Go to Site Settings → Build & Deploy → Environment
- Add all VITE_FIREBASE_* variables

### Firebase Hosting:
- Use `.env.production` file or GitHub Secrets

## Step 6: Auto-Cleanup Old Sessions (Optional)

Set up Cloud Functions to delete sessions older than 24 hours:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.cleanupOldSessions = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
    const sessionsRef = admin.database().ref('sessions');
    const snapshot = await sessionsRef.once('value');
    
    const updates = {};
    snapshot.forEach((child) => {
      const session = child.val();
      if (session.createdAt < cutoff) {
        updates[child.key] = null; // Delete old session
      }
    });
    
    await sessionsRef.update(updates);
    console.log('Cleaned up old sessions');
  });
```

---

## ✅ Security Checklist

- [ ] Firebase Security Rules configured
- [ ] API Key restricted to your domains
- [ ] Environment variables set up
- [ ] .env added to .gitignore
- [ ] No secrets in code repository
- [ ] App Check enabled (optional but recommended)
- [ ] Auto-cleanup for old data (optional)

## ⚠️ Important Notes

1. **Firebase API Key in Frontend is Normal** - It's designed to be public, but MUST be restricted
2. **Security Rules are the Real Protection** - They run server-side and can't be bypassed
3. **Never Store Sensitive Data** - This app only stores letters (A-Z), no personal info
4. **Sessions are Temporary** - Consider auto-deleting after 24 hours

---

Your app is simple (just letters A-Z), so attack surface is very limited. 
With proper rules, even if someone tries to abuse, they can only:
- Create sessions with valid IDs
- Send single uppercase letters
That's it! No real damage possible. 🛡️
