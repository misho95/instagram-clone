import { getDataFromServer } from "../../utils/firebase";
import { useState, useEffect } from "react";
import { userType } from "../../utils/zustand";
import { Avatar } from "@mui/material";

const ChatMessageComponent = ({ data }) => {
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
    <div className="flex gap-3">
      <Avatar
        alt={user?.userName}
        src={user?.avatar}
        sx={{ width: 18, height: 18 }}
      />
      <span className="text-gray-700">{data.message}</span>
    </div>
  );
};

export default ChatMessageComponent;
