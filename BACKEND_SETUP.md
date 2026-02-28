# Fake News Detector - Backend Setup Guide

## Backend Structure
```
Backend/
├── server.js                 # Main server entry point
├── package.json             # Backend dependencies
├── .env.example             # Environment variables template
├── Config/
│   └── db.js               # MongoDB connection
├── Controller/
│   └── authController.js   # Authentication logic
├── model/
│   ├── userModel.js        # User schema
│   └── fakemodel.js        # Fake news schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   └── fakeRoutes.js       # Fake news endpoints
└── Middleware/             # Custom middleware (if needed)
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment
Create a `.env` file in the Backend folder:
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/fake_news_detector
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run Backend Server
```bash
npm start      # Production
npm run dev    # Development with nodemon
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/signin` - Login user

### Fake News
- **GET** `/api/fake` - Get all fake news entries
- **POST** `/api/fake` - Create new fake news entry
- **GET** `/api/fake/:id` - Get fake news by ID
- **PUT** `/api/fake/:id` - Update fake news entry
- **DELETE** `/api/fake/:id` - Delete fake news entry

## Frontend Connection
The frontend is configured to connect to the backend at `http://localhost:5000/api`

Update your frontend API calls to use:
- Authentication: `/api/auth/signup` and `/api/auth/signin`
- Fake News Detection: `/api/fake` endpoints

## Models

### User Model
- firstName (required)
- lastName (required)
- email (required, unique)
- MobileNo (required, unique)
- Password (required, hashed)
- timestamps

### Fake News Model
- title (required)
- content (required)
- newsText (optional)
- label (optional)
- timestamps

## Issues Fixed
✅ Fixed import paths (./config → ./Config)
✅ Fixed typo (moongoose → mongoose)
✅ Fixed schema names (fakeSchema → userSchema in userModel.js)
✅ Added User model export
✅ Fixed controller function names (signup → Signup, signin → Signin)
✅ Fixed route case sensitivity
✅ Fixed variable references in controllers
✅ Added proper error handling
✅ Added GET by ID endpoint
✅ Added Update and Delete functionality
