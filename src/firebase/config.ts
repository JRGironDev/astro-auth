// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";



// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCspIuVkcQpo-wb1kteCZM0TUws8U2wd-8",
  authDomain: "astro-authentication-a37b4.firebaseapp.com",
  projectId: "astro-authentication-a37b4",
  storageBucket: "astro-authentication-a37b4.firebasestorage.app",
  messagingSenderId: "268242014432",
  appId: "1:268242014432:web:c54f7932e8edc4ba960085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
  app,
  auth
};