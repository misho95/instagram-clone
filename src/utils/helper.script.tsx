import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase";
import { ref, deleteObject } from "firebase/storage";
import { userType, PostsType, followersType } from "./zustand";
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

export const getRealTimePostsCollectionWithUserId = async (
  server: string,
  userId: string,
  set: (arg: PostsType[]) => void
) => {
  const collectionRef = collection(db, server);
  const q = query(collectionRef, where("userId", "==", userId));

  let getNewData: PostsType[] = [];

  onSnapshot(
    q,
    (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Access the document data
        const data = doc.data();
        const casterData: PostsType = data as PostsType;
        getNewData.push(casterData);
      });
      set(getNewData);
      getNewData = [];
    },
    (error) => {
      console.error("Error getting documents:", error);
    }
  );
};

export const getRealTimeCollectionAndSetIt = async (
  server: string,
  set: (arg: string[]) => void
) => {
  onSnapshot(collection(db, server), (querySnapshot) => {
    const data: string[] = [];

    querySnapshot.forEach((doc) => {
      // Access individual document data using doc.data()
      data.push(doc.data().userName);
    });

    // Now 'data' contains an array of documents from the collection
    set(data);
  });
};

export const getRealTimeFeedsCollectionAndSetIt = async (
  server: string,
  currentUserId: string,
  userFriendsIds: followersType[],
  setDataToSend: (arg: any) => void
) => {
  const userIds = userFriendsIds.map((item) => item.id);
  userIds.push(currentUserId);
  const collectionRef = collection(db, server);
  const q = query(collectionRef, where("userId", "in", userIds));

  let feedsDataToSend: PostsType[] = [];

  // Listen for changes in the query results
  onSnapshot(
    q,
    (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Access the document data
        const data = doc.data();
        const casterData: PostsType = data as PostsType;
        feedsDataToSend.push(casterData);
      });

      const sortByDate = feedsDataToSend.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });

      feedsDataToSend = [];

      setDataToSend(sortByDate);
    },

    (error) => {
      console.error("Error getting documents:", error);
    }
  );
};

export const deleteImgInStorage = async (imgUrl: string) => {
  const desertRef = ref(storage, imgUrl);
  // Delete the file
  deleteObject(desertRef).catch((error) => {
    // Uh-oh, an error occurred!
    console.log(error);
  });
};

// export const getDataFromServerWhereValueEqualsSomeValue = async (
//   server: string,
//   value: string,
//   equal: string,
//   set: () => void
// ) => {
//   const collectionRef = collection(db, server);
//   const q = query(collectionRef, where(value, "==", equal));

//   try {
//     const querySnapshot = await getDocs(q);

//     const dataToReturn = [];
//     querySnapshot.forEach((doc) => {
//       // Access the document data
//       const data = doc.data();
//       dataToReturn.push(data);
//     });

//     set(dataToReturn);
//   } catch (error) {
//     console.error("Error getting documents:", error);
//     throw error; // Propagate the error up the call stack
//   }
// };
