import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyDl5tTN-ykZG7OBLBxOJ4kea5hxL2sTHwI",
  authDomain: "workpulse-bfb02.firebaseapp.com",
  projectId: "workpulse-bfb02",
  storageBucket: "workpulse-bfb02.firebasestorage.app",
  messagingSenderId: "553371468358",
  appId: "1:553371468358:web:395ff1f227f7bbe20ac047"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);