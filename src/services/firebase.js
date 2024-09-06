// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdfq_ZzwuDS9D6Z5f_rjCjZVnABSXZFMw",
  authDomain: "iffood-web.firebaseapp.com",
  projectId: "iffood-web",
  storageBucket: "iffood-web.appspot.com",
  messagingSenderId: "438219553049",
  appId: "1:438219553049:web:f3f4fc8d22dc9325bb2d88",
  measurementId: "G-HL1KCB825J"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app as default, storage };

