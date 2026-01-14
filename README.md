

<div align="center">
	<img src="https://user-images.githubusercontent.com/99184393/236683073-2e2e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e.png" width="100" alt="Stranger Wall Logo" />
  
	<h1>🧱 Stranger Wall <br><sub><sup>Send Secret Messages Like Stranger Things!</sup></sub></h1>
	<p>
		<img src="https://img.shields.io/badge/React-19-blue?logo=react" />
		<img src="https://img.shields.io/badge/Firebase-DB-yellow?logo=firebase" />
		<img src="https://img.shields.io/badge/Live-RealTime-green" />
		<img src="https://img.shields.io/badge/Inspired%20By-Stranger%20Things-red" />
	</p>
	<img src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif" width="400" alt="Stranger Things Wall" />
</div>

---

<p align="center">
	<b>Send glowing messages from the Upside Down to the Overworld.<br>Letters light up in real time, just like Stranger Things!<br>Share the link, connect, and chat with lights. 🔦✨</b>
</p>

---

## 🚦 Quick Demo

<details>
<summary>Click to see how it works (screenshots/gif)</summary>

![Demo](https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif)

</details>

---

## ✨ Features

🌈 **Real-time Light Wall** — Send letters, see them glow instantly!

🌍 **Two Worlds**
	- **Upside Down** (Sender, dark theme)
	- **Overworld** (Receiver, warm theme)

👥 **Live Presence** — Know when your friend is online.

🔔 **Sound & Animation** — Each letter glows and chimes.

🛡️ **Super Secure** — Rate limiting, App Check, and strict validation.

---

## 🛠️ Tech Stack

<table>
	<tr><td>⚛️ React 19 (Vite)</td><td>🔥 Firebase Realtime DB</td></tr>
	<tr><td>🎨 Custom CSS Animations</td><td>🖼️ lucide-react Icons</td></tr>
</table>

---

## 🗂️ Project Structure

```text
src/
	App.jsx                # Routing logic
	firebase.js            # Firebase/AppCheck setup
	firebase/
		config.js            # (Firebase config, if used)
		firebaseService.js   # Send/listen letters, rate limiting
		presenceService.js   # Online status
	shared/components/     # LayerCanvas, VolumeToggle, DeveloperContact
	worlds/
		overworld/           # Receiver wall (Overworld)
		upsideDown/          # Sender wall (Upside Down)
	utils/security.js      # Rate limiters, validation
```

---

## ⚡ How To Use

1. **Clone & Install**
	 ```bash
	 git clone <repo-url>
	 cd stranger-wall
	 npm install
	 ```
2. **Setup Firebase**
	 - Create a Firebase project
	 - Enable Realtime Database
	 - Set rules from [`FIREBASE_SECURITY.md`](FIREBASE_SECURITY.md)
	 - Add App Check (reCAPTCHA v3)
	 - Add your Firebase config to `.env`:
		 ```env
		 VITE_FIREBASE_API_KEY=...
		 VITE_FIREBASE_AUTH_DOMAIN=...
		 VITE_FIREBASE_DATABASE_URL=...
		 VITE_FIREBASE_PROJECT_ID=...
		 VITE_FIREBASE_STORAGE_BUCKET=...
		 VITE_FIREBASE_MESSAGING_SENDER_ID=...
		 VITE_FIREBASE_APP_ID=...
		 VITE_RECAPTCHA_SITE_KEY=...
		 ```
3. **Run Locally**
	 ```bash
	 npm run dev
	 ```
4. **Build for Production**
	 ```bash
	 npm run build
	 ```

---

## 🧠 How It Works

1. **Upside Down**: Open `/` (home). Click letters to send. Share the link with a friend.
2. **Overworld**: Open `/wall/:sessionId` (use the shared link). Letters light up as they arrive!
3. **Presence**: Both users see if the other is online.

---

## 🔒 Security Highlights

- 🔐 **Firebase App Check** — Only real users can write/read
- 🚦 **Rate Limiting** — Max 10 letters/sec, 60/minute per session
- 🧾 **Session Validation** — Only valid session IDs allowed
- 🛡️ **Strict DB Rules** — See [`FIREBASE_SECURITY.md`](FIREBASE_SECURITY.md)

---

## 👨‍💻 Developer

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/kshitij5228">
				<img src="https://github.com/kshitij5228.png" width="80" style="border-radius:50%" alt="Kshitij Nakod"/><br/>
				<b>Kshitij Nakod</b>
			</a>
			<br/>
			<a href="mailto:nakod.kshitij5228@gmail.com">✉️ Email</a> |
			<a href="https://linkedin.com/in/kshitij-nakod-3293bb299">LinkedIn</a>
		</td>
	</tr>
</table>

---

## 🌐 Deployment

- Supports Vercel, Netlify, or any static host
- See `vercel.json` and `netlify.toml` for configs

---

## 📜 Credits

- Inspired by Stranger Things (Netflix)
- Built with React, Firebase, and lots of lights!

---

<div align="center">
	<b>Enjoy sending secret messages through the wall!<br>🔦✨</b>
</div>

