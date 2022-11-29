import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBm10WXsC2hvbqrPFyw0M_1I1Vltg6-860",
  authDomain: "management-3174b.firebaseapp.com",
  projectId: "management-3174b",
  storageBucket: "management-3174b.appspot.com",
  messagingSenderId: "46867760429",
  appId: "1:46867760429:web:562c27afdd8b28cfe9ffa4"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);