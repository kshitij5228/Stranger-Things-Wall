# 🎄 Stranger Wall

A real-time interactive web experience inspired by the iconic Christmas lights wall scene from **Stranger Things**. Two users can communicate through glowing alphabet letters - just like Joyce and Will!

![Stranger Things Wall](https://img.shields.io/badge/Inspired%20By-Stranger%20Things-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite)

---

## 🌟 Features

- **🎅 Overworld Mode** - The normal world with warm Christmas lights aesthetic
- **🌀 Upside Down Mode** - Dark, eerie version with particle effects
- **⚡ Real-time Communication** - Letters glow instantly across devices
- **🔗 Session-based** - Share a unique link to connect with someone
- **� Sound Effects** - Soft bell chime when letters glow (works even when music is muted)
- **🟢 Live Connection Status** - See when the other person is online/offline
- **⏱️ Smart Letter Queue** - Multiple letters play smoothly with proper timing
- **🔊 Background Music** - Immersive ambient audio with volume toggle
- **📱 Responsive Design** - Works on desktop and mobile devices
- **🔄 Easy World Switch** - Quick toggle to switch between Overworld and Upside Down

---

## 🎬 How It Works

### The Concept
Just like in Stranger Things Season 1, where Joyce Byers communicates with Will through Christmas lights, this app lets two people communicate by clicking on alphabet letters.

### The Flow
1. **User A** opens the app (Upside Down) and clicks "Get Link"
2. **User A** shares this URL with **User B**
3. **User B** opens the link (enters the Overworld)
4. Both users see **🟢 Connected** status when linked
5. When **User A** clicks a letter → It glows on **User B's** screen with a soft bell sound
6. Multiple letters queue up and play smoothly with gaps between them
7. If either user disconnects, the other sees **🔴 Disconnected** status

### Technical Flow
```
User A (Overworld)          Firebase Realtime DB          User B (Upside Down)
       |                            |                            |
       |  Click Letter "H"          |                            |
       |--------------------------->|                            |
       |                            |  Push letter data          |
       |                            |--------------------------->|
       |                            |                   Letter "H" glows!
       |                            |                            |
       |                            |  Click Letter "I"          |
       |                            |<---------------------------|
       |  Letter "I" glows!         |                            |
       |<---------------------------|                            |
```

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building interactive components |
| **Vite** | Fast build tool and development server |
| **React Router** | Client-side routing for different worlds |
| **CSS3** | Styling with animations and effects |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Firebase Realtime Database** | Real-time data synchronization between users |
| **Firebase App Check** | Security - Protects against abuse |

### Security
| Technology | Purpose |
|------------|---------|
| **reCAPTCHA v3** | Bot protection via App Check |
| **Rate Limiting** | Prevents spam (client-side) |
| **Input Validation** | Only allows valid letters A-Z |
| **Firebase Security Rules** | Server-side data validation |

### Hosting & Deployment
| Technology | Purpose |
|------------|---------|
| **Cloudflare Pages / Vercel / Netlify** | Static site hosting with CDN |
| **Environment Variables** | Secure credential management |

---

## 📁 Project Structure

```
stranger-wall/
├── public/
│   ├── assets/
│   │   ├── overworld/fonts/      # Overworld custom fonts
│   │   └── upside_down/fonts/    # Upside Down custom fonts
│   ├── audio/                    # Sound effects
│   └── images/                   # Images and textures
│
├── src/
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # React entry point
│   ├── firebase.js               # Firebase initialization + App Check
│   │
│   ├── firebase/
│   │   ├── config.js             # Firebase configuration
│   │   ├── firebaseService.js    # Database operations (send/receive letters)
│   │   └── presenceService.js    # Real-time user presence tracking
│   │
│   ├── utils/
│   │   └── security.js           # Rate limiting, validation, sanitization
│   │
│   ├── shared/
│   │   ├── components/           # Shared UI components
│   │   │   ├── LayerCanvas.jsx
│   │   │   ├── DeveloperContact/
│   │   │   └── VolumeToggle/
│   │   ├── styles/
│   │   │   └── global.css        # Global styles
│   │   └── utils/
│   │
│   └── worlds/
│       ├── overworld/            # Normal world (User A)
│       │   ├── OverworldWall.jsx
│       │   ├── overworld.css
│       │   ├── layerOrder.js
│       │   └── layers/
│       │       ├── Layer1WallTexture/
│       │       ├── Layer2Alphabet/
│       │       ├── Layer3FairyLights/
│       │       ├── Layer4LightGlow/
│       │       └── Layer5AmbientShadow/
│       │
│       └── upsideDown/           # Upside Down (User B)
│           ├── UpsideDownWall.jsx
│           ├── upsideDown.css
│           ├── layerOrder.js
│           └── layers/
│               ├── Layer1WallTexture/
│               ├── Layer2Alphabet/
│               ├── Layer3FairyLights/
│               ├── Layer3Particles/
│               ├── Layer4LightGlow/
│               └── Layer5AmbientShadow/
│
├── .env                          # Environment variables (not in git)
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml                  # Netlify config with security headers
├── vercel.json                   # Vercel config with security headers
└── FIREBASE_SECURITY.md          # Security setup guide
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase account
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/stranger-wall.git
cd stranger-wall
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Realtime Database**
3. Set up **App Check** with reCAPTCHA v3
4. Copy your Firebase config

### 4. Environment Variables
Create a `.env` file in the root:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### 5. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173

### 6. Build for Production
```bash
npm run build
```

---

## 🔐 Security Features

This app implements multiple layers of security:

### Client-Side
- ✅ **Rate Limiting** - Max 10 letters/second, 60 letters/minute
- ✅ **Input Validation** - Only single uppercase letters A-Z allowed
- ✅ **Session ID Validation** - Only valid format accepted
- ✅ **XSS Prevention** - String sanitization

### Server-Side (Firebase)
- ✅ **Security Rules** - Validates all data server-side
- ✅ **App Check** - Blocks requests from unauthorized sources
- ✅ **API Key Restrictions** - Limited to specific domains

### Headers (Hosting)
- ✅ **Content-Security-Policy** - Restricts resource loading
- ✅ **X-Frame-Options** - Prevents clickjacking
- ✅ **X-Content-Type-Options** - Prevents MIME sniffing

See [FIREBASE_SECURITY.md](./FIREBASE_SECURITY.md) for detailed security setup.

---

## 🎨 Visual Layers

The wall effect is created using multiple layered components:

| Layer | Component | Purpose |
|-------|-----------|---------|
| 1 | WallTexture | Background wall texture |
| 2 | Alphabet | The A-Z letters with Christmas lights |
| 3 | FairyLights / Particles | Decorative lights or particle effects |
| 4 | LightGlow | Glow effect when letter is activated |
| 5 | AmbientShadow | Overall ambient shadow overlay |

---

## 📱 Routes

| Route | World | Description |
|-------|-------|-------------|
| `/` | Upside Down | Landing page - Sender generates link here |
| `/wall/:sessionId` | Overworld | Receiver opens shared link here |

---

## 🎵 Audio

The app includes immersive audio:
- **Bell sound effect** - Soft 440Hz chime when receiving a letter (plays even when muted)
- **Ambient music** - Background atmosphere for both worlds
- **Volume toggle** - Mute/unmute background music (bell sounds still play)
- **Smart queue** - 0.5 second gap between letters prevents audio overlap

---

## 🟢 Connection Status

Real-time peer presence system:
- **🟢 Connected** - Both users are online and linked
- **🟡 Waiting** - Waiting for the other user to connect  
- **🔴 Disconnected** - Other user went offline or closed the page
- Uses Firebase Presence with `onDisconnect()` for accurate status

---

## 🤝 How to Use

### As the Sender (Upside Down - Starting Point)
1. Open the app at the main URL
2. Click **"Get Link"** to generate a unique session
3. Share the copied link with a friend
4. See **🟡 Waiting for Overworld...** until friend connects
5. Once connected (**🟢 Overworld Connected**), click letters to send messages!

### As the Receiver (Overworld - Via Shared Link)
1. Open the shared link from your friend
2. See **🟡 Waiting...** until sender connects
3. Once connected (**🟢 Connected**), watch for glowing letters
4. Each letter glows for 2 seconds with a soft bell sound
5. Click **"Enter Upside Down"** (top-left) to become a sender too


---

## 📄 License

This project is for educational and fan purposes only. Stranger Things is owned by Netflix.

---

## 🙏 Acknowledgments

- **Netflix** - For creating the amazing Stranger Things series
- **Duffer Brothers** - For the iconic Christmas lights scene
- **Firebase** - For real-time database capabilities
- **React Team** - For the awesome UI library

---

Made with ❤️ and 🎄 Christmas lights

*"Will, if you're out there, just give me a sign..."* - Joyce Byers
#   S t r a n g e r - T h i n g s - W a l l  
 