import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";

export const checkUserState = async (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      onSnapshot(doc(db, "users", uid), (doc) => {
        setUser(doc.data());
      });
    } else {
      // User is signed out
      // ...
    }
  });
};
