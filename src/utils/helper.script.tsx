import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";

interface userType {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  pass: string;
  avatar: string;
}

export const checkUserState = async (
  setUser: (arg: userType | null) => void
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      onSnapshot(doc(db, "users", uid), (doc) => {
        const userData = doc.data() as userType | undefined;
        setUser(userData || null);
      });
    } else {
      // User is signed out
      // ...
    }
  });
};
