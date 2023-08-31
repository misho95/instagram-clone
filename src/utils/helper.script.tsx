import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";
import { ref, deleteObject } from "firebase/storage";
import { userType } from "./zustand";
import { storage } from "./firebase";

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

export const getRealTimeUpdateAndSetIt = async (
  server: string,
  id: string,
  setDataToSend: (arg: any) => void
) => {
  onSnapshot(doc(db, server, id), (doc) => {
    const userData = doc.data() as userType | undefined;
    setDataToSend(userData);
  });
};

export const deleteImgInStorage = async (imgUrl: string) => {
  const desertRef = ref(storage, imgUrl);
  // Delete the file
  deleteObject(desertRef).catch((error) => {
    // Uh-oh, an error occurred!
    console.log(error);
  });
};
