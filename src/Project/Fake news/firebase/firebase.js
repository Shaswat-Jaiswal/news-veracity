import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDBPIpmunu7dWi9fPNnWCarBI4IfSLzKe0",
  authDomain: "fake-news-detector-ea540.firebaseapp.com",
  projectId: "fake-news-detector-ea540",
  storageBucket: "fake-news-detector-ea540.firebasestorage.app",
  messagingSenderId: "815826735964",
  appId: "1:815826735964:web:789fa10d47b58bf2066799",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);