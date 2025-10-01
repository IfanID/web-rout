// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, getAdditionalUserInfo, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const additionalUserInfo = getAdditionalUserInfo(result);
    return { user, additionalUserInfo };
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

const saveUserCoverPhoto = async (userName, photoUrl) => {
  // PERINGATAN PENTING: Menggunakan displayName sebagai ID dokumen Firestore
  // Ini BUKAN praktik terbaik karena displayName TIDAK dijamin unik dan dapat berubah.
  // Jika ada dua pengguna dengan nama yang sama, data akan saling menimpa.
  // Jika pengguna mengubah namanya, dokumen lama akan terpisah dan data baru akan dibuat.
  // UID (User ID) adalah pengenal yang unik dan tidak berubah yang direkomendasikan untuk ID dokumen pengguna.
  try {
    const userDocRef = doc(db, 'users', userName); // Menggunakan userName sebagai ID dokumen
    await setDoc(userDocRef, { coverPhotoUrl: photoUrl }, { merge: true });
  } catch (error) {
    console.error('Firestore: Error saat menyimpan foto sampul:', error);
    throw error;
  }
};

const getUserCoverPhoto = async (userName) => {
  // PERINGATAN PENTING: Menggunakan displayName sebagai ID dokumen Firestore
  // Ini BUKAN praktik terbaik karena displayName TIDAK dijamin unik dan dapat berubah.
  // UID (User ID) adalah pengenal yang unik dan tidak berubah yang direkomendasikan untuk ID dokumen pengguna.
  try {
    const userDocRef = doc(db, 'users', userName); // Menggunakan userName sebagai ID dokumen
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const coverPhotoUrl = userDocSnap.data().coverPhotoUrl;
      return coverPhotoUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Firestore: Error saat mengambil foto sampul:', error);
    throw error;
  }
};
export { app, auth, db, signInWithGoogle, signOutUser, onAuthStateChanged, saveUserCoverPhoto, getUserCoverPhoto };