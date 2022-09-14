// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

// Database
export const getPost = async (postId: string) => {
  const docRef = doc(firestore, "posts", postId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data();
};

export const addPost = async ({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) => {
  const getKST = () => {
    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);
    return kr_curr;
  };

  await setDoc(doc(firestore, "posts", `${id}`), {
    title,
    body,
    date: Timestamp.fromDate(getKST()),
  });
};

export const deletePost = async (id: number) => {
  await deleteDoc(doc(firestore, "posts", `${id}`));
};

export const updatePost = async ({
  id,
  title,
  body,
}: {
  id: string;
  title?: string;
  body?: string;
}) => {
  const docRef = doc(firestore, "posts", id);
  await updateDoc(docRef, {
    title,
    body,
    date: Timestamp.fromDate(new Date()),
  });
};

// Auth
const auth = getAuth(app);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;
    return user;
  } catch (e) {
    return null;
  }
};
