import { getDataFromServer } from "../../utils/firebase";
import { useState, useEffect } from "react";
import { loadedChatUsersType, userType } from "../../utils/zustand";
import { Avatar } from "@mui/material";

interface PropsType {
  data: loadedChatUsersType;
  activeUserChat: (arg: loadedChatUsersType) => void;
}

const ChatUserLoader = ({ data, activeUserChat }: PropsType) => {
  const [user, setUser] = useState<userType | null>(null);
  const getUserData = async () => {
    const userData = await getDataFromServer("users", data.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex gap-3" onClick={() => activeUserChat(data)}>
      <Avatar
        alt={user?.userName}
        src={user?.avatar}
        sx={{ width: 24, height: 24 }}
      />
      <span className="text-gray-700">{user?.userName}</span>
    </div>
  );
};

export default ChatUserLoader;
