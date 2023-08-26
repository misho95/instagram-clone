import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";

import { userType } from "./zustand";

const firebaseConfig = {
  apiKey: "AIzaSyAK6pESjFKKPK6aT5Ir5L_PA6TzsRhDS40",
  authDomain: "instagram-clone-9c3ea.firebaseapp.com",
  projectId: "instagram-clone-9c3ea",
  storageBucket: "instagram-clone-9c3ea.appspot.com",
  messagingSenderId: "938485543929",
  appId: "1:938485543929:web:9602632662fa1427e88328",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
auth.languageCode = "it";

export const createUserWithEmailandPass = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const authWithEmailandPass = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const addNewDataInServerStorage = async (
  server: string,
  id: string,
  obj: any
) => {
  await setDoc(doc(db, server, id), obj);
};

export const getDataFromServer = async (server: string, id: string) => {
  const docRef = doc(db, server, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getDataFromServerByUserName = async (
  server: string,
  userName: string | undefined
) => {
  const q = query(collection(db, server), where("userName", "==", userName));

  const data: userType[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const getData = doc.data() as userType;
    data.push(getData);
  });
  return data;
};

export const singOutCurrentUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};
