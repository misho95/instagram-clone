import {
  getDataFromServer,
  deleteDataInServerArray,
} from "../../utils/firebase";
import { useState, useEffect } from "react";
import { loadedChatUsersType, userSignIn, userType } from "../../utils/zustand";
import { Avatar, Skeleton } from "@mui/material";

interface PropsType {
  data: loadedChatUsersType;
  activeUserChat: (arg: loadedChatUsersType) => void;
}

const ChatUserLoader = ({ data, activeUserChat }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async () => {
    const userData = await getDataFromServer("users", data.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
    setLoading(false);
  };

  const closeActiveLoadedUser = async () => {
    if (currentUser) {
      await deleteDataInServerArray(
        "users",
        currentUser.id,
        "loadedChatUsers",
        data
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-between items-center">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={240} height={10} />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div onClick={() => activeUserChat(data)} className="flex gap-3 relative">
        {data.notif && (
          <div className="bg-red-500 w-4 h-4 rounded-full text-white flex justify-center items-center text-xs absolute z-10 -top-1 left-3">
            1
          </div>
        )}
        <Avatar
          alt={user?.userName}
          src={user?.avatar}
          sx={{ width: 24, height: 24 }}
        />
        <span className="text-gray-700">{user?.userName}</span>
      </div>
      <button onClick={closeActiveLoadedUser}>
        <span className="material-symbols-outlined text-red-500">close</span>
      </button>
    </div>
  );
};

export default ChatUserLoader;
