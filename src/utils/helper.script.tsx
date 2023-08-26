import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";

import { userType } from "./zustand";

export const checkUserOrRedirect = async (
  setUser: (arg: userType | null) => void,
  setLoading: (arg: boolean) => void,
  navigate: (arg: string) => void
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      onSnapshot(doc(db, "users", uid), (doc) => {
        const userData = doc.data() as userType | undefined;
        setUser(userData || null);
        setLoading(false);
      });
    } else {
      navigate("/signin");
    }
  });
};

export const checkUserOrRedirectForUserForm = async (
  setUser: (arg: userType | null) => void,
  navigate: (arg: string) => void
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      onSnapshot(doc(db, "users", uid), (doc) => {
        const userData = doc.data() as userType | undefined;
        setUser(userData || null);
        navigate("/");
      });
    } else {
    }
  });
};
