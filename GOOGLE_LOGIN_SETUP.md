# Google Login Setup Guide 🔐

## ✅ What Has Been Configured

Your Google OAuth login is now fully integrated! Here's what was set up:

### Backend Changes:
1. **Updated `.env`** with your Google credentials:
   - `GOOGLE_CLIENT_ID`: `440497578298-d3ohtfa7ad82t3d6tp6vcloq8rqgd2ct.apps.googleusercontent.com`
   - `GOOGLE_CLIENT_SECRET`: `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`
   - Added `JWT_SECRET` for token signing
   - Added `CLIENT_PORT` for redirect flexibility

2. **Updated User Model** (`Backend/model/userModel.js`):
   - Made `MobileNo` and `Password` optional (for Google OAuth users)
   - Added `googleId` field with unique constraint
   - Added sparse indexes to allow nullable unique fields

3. **Enhanced Passport Configuration** (`Backend/Config/passport.js`):
   - Improved Google Strategy with better user lookup
   - Handles existing users + new Google OAuth registrations
   - Links Google ID to existing email accounts

4. **Updated Auth Routes** (`Backend/routes/authRoutes.js`):
   - Google callback properly redirects to frontend with JWT token
   - Supports both localhost:5173 and 5174 dynamically

### Frontend Changes:
1. **Enhanced Login Component** (`src/Project/Fake news/Log in/Login.jsx`):
   - Added loading state for Google login button
   - Improved token handling from Google callback
   - Added helpful tooltips and better UX
   - Automatically redirects after successful Google login

2. **CSS Already Optimized** (`Login.css`):
   - Google icon styled with red background (#ea4335)
   - Hover effects for social buttons
   - Responsive and clean UI

## 🚀 How to Use

### Step 1: Start MongoDB
```bash
mongod
```

### Step 2: Start Backend
```bash
cd Backend
npm install  # If not done already
npm run dev
```
Backend will run on `http://localhost:5000`

### Step 3: Start Frontend
```bash
# In root directory
npm install  # If not done already
npm run dev
```
Frontend will run on `http://localhost:5173` or `5174`

### Step 4: Test Google Login
1. Click the red Google icon on the login page
2. You'll be redirected to Google's OAuth consent screen
3. Sign in with your Google account
4. You'll be automatically logged in and redirected to your app
5. Your JWT token is saved in localStorage as `authToken`

## 🔑 Important Setup in Google Cloud Console

Make sure these redirect URIs are configured in Google Cloud Console:

**Authorized JavaScript origins:**
- `http://localhost:3000`
- `http://localhost:5000`
- `http://localhost:5173`
- `http://localhost:5174`

**Authorized redirect URIs:**
- `http://localhost:3000/`
- `http://localhost:5000/api/auth/google/callback`
- `http://localhost:5173/?token=...`
- `http://localhost:5174/?token=...`

## 📋 How It Works

1. **User clicks Google icon** → Redirected to `/api/auth/google`
2. **Passport middleware** → Redirects to Google OAuth consent screen
3. **User authenticates** → Google sends back user profile
4. **Backend creates/finds user** → Generates JWT token
5. **Redirect to frontend** → With `?token=XXX` in URL
6. **Frontend captures token** → Saves to localStorage
7. **User is logged in** → Can access the app

## 🛡️ Security Notes

- ✅ Credentials stored in `.env` (not in code)
- ✅ JWT tokens expire in 30 days
- ✅ Unique Google IDs prevent duplicate accounts
- ✅ Sparse indexes allow nullable unique fields
- ⚠️ Change `JWT_SECRET` to a strong value in production

## 🐛 Troubleshooting

### Issue: "Redirect URI mismatch"
**Solution:** Check Google Cloud Console OAuth 2.0 settings and add the correct URLs

### Issue: User already registered with email
**Solution:** System will link Google ID to existing email account

### Issue: Token not saving
**Solution:** Check if localStorage is enabled and CORS headers are correct

### Issue: Page not redirecting after Google login
**Solution:** Check if the redirect URL in `.env` matches your frontend port

## 📝 Environment Variables Needed

```
MONGO_URL=mongodb://localhost:27017/fake
PORT=5000
GOOGLE_CLIENT_ID=440497578298-d3ohtfa7ad82t3d6tp6vcloq8rqgd2ct.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_PORT=5173
```

## ✨ Next Steps

1. Test the Google login thoroughly
2. Add logout functionality
3. Create a protected routes middleware
4. Store user info in state after login
5. Add Facebook/Twitter OAuth (similar setup)

Enjoy your Google OAuth login! 🎉
