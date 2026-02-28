# Quick Start Commands 🚀

## 1️⃣ Terminal 1: Start MongoDB
```bash
mongod
```

## 2️⃣ Terminal 2: Start Backend
```bash
cd Backend
npm install
npm run dev
```
✅ Backend running on: `http://localhost:5000`

## 3️⃣ Terminal 3: Start Frontend  
```bash
npm install
npm run dev
```
✅ Frontend running on: `http://localhost:5173`

## 4️⃣ Test Google Login
1. Open `http://localhost:5173` in browser
2. Click the red **Google Icon** on login page
3. Sign in with your Google account
4. You'll be automatically logged in! ✨

## 📦 What's Installed
- ✅ `passport-google-oauth20` - For Google OAuth
- ✅ `express-session` - Session management
- ✅ `jsonwebtoken` - JWT token generation
- ✅ `mongoose` - MongoDB ODM
- ✅ `react-icons` - Beautiful icons

## 🔍 Key Files Modified
```
Backend/
├── .env (✅ Added Google credentials)
├── server.js (✅ Passport configured)
├── Config/
│   └── passport.js (✅ Enhanced Google Strategy)
├── routes/
│   └── authRoutes.js (✅ Updated callback redirect)
└── model/
    └── userModel.js (✅ Optional fields for Google OAuth)

src/
└── Project/Fake news/Log in/
    └── Login.jsx (✅ Enhanced Google login handler)
```

## 💡 Pro Tips
- Check browser console for "✅ Google Login Success!" message
- Token is stored in `localStorage.authToken`
- You can use the token for API requests with Authorization header
- Google users don't need password (optional fields enabled)

## ❓ Having Issues?
See [GOOGLE_LOGIN_SETUP.md](GOOGLE_LOGIN_SETUP.md) for detailed troubleshooting!
