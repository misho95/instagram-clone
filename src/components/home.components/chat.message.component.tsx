import {
  getDataFromServer,
  updateDataInServerArray,
} from "../../utils/firebase";
import { useState, useEffect } from "react";
import {
  directChatMessageType,
  userSignIn,
  userType,
} from "../../utils/zustand";
import { Avatar } from "@mui/material";

interface PropsType {
  data: directChatMessageType;
}

interface seenDataUsers {
  userId: string;
}

interface seenData {
  id: string;
  usersSeen: seenDataUsers[];
}

const ChatMessageComponent = ({ data }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [user, setUser] = useState<userType | null>(null);
  const [seenData, setSeenData] = useState<seenData | undefined>();

  const getUserData = async () => {
    const userData = await getDataFromServer("users", data.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  const getSeenData = async () => {
    const seenData = await getDataFromServer("chatSeen", data.id);
    const casterSeenData: seenData = seenData as seenData;
    setSeenData(casterSeenData);
  };

  const updateSeenData = async () => {
    if (currentUser) {
      await updateDataInServerArray("chatSeen", data.id, "usersSeen", {
        userId: currentUser.id,
      });
    }
  };

  useEffect(() => {
    getUserData();
    getSeenData();
  }, []);

  useEffect(() => {
    if (seenData) {
      updateSeenData();
    }
  }, [seenData]);

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
