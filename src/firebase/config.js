import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxfrHvz2KltaXmPONdXZGWGuFQT9lsrJw",
  authDomain: "city-control-simulator.firebaseapp.com",
  projectId: "city-control-simulator",
  storageBucket: "city-control-simulator.firebasestorage.app",
  messagingSenderId: "32564139747",
  appId: "1:32564139747:web:648d6ffb10554e3eb197d6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 