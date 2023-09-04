import { useEffect, useState } from "react";
import { notifType, userSignIn } from "../../utils/zustand";
import {
  getDataFromServer,
  updateDataInServerArray,
  deleteDataInServerArray,
  updateNotifSeenStatus,
} from "../../utils/firebase";
import { userType } from "../../utils/zustand";
import { Avatar } from "@mui/material";

interface PropsType {
  data: notifType;
}

const NotifContent = ({ data }: PropsType) => {
  const user = userSignIn((state) => state.user);
  const [userInfo, setUserInfo] = useState<userType | undefined>();

  const waitUserInfo = async () => {
    const user = await getDataFromServer("users", data.userId);
    const castedUser: userType = user as userType;
    setUserInfo(castedUser);
  };

  const updateSeenStatus = async () => {
    if (user) {
      updateNotifSeenStatus(user.id, data.id);
    }
  };

  useEffect(() => {
    waitUserInfo();
    updateSeenStatus();
  }, []);

  const followBack = async () => {
    if (userInfo && user) {
      await updateDataInServerArray("users", user?.id, "following", {
        id: userInfo.id,
        userName: userInfo.userName,
      });
      await updateDataInServerArray("users", userInfo.id, "followers", {
        id: user.id,
        userName: user.userName,
      });
      await deleteDataInServerArray("users", user?.id, "notif", data);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-6">
        <Avatar
          alt={userInfo?.userName}
          src={userInfo?.avatar}
          sx={{ width: 24, height: 24 }}
        />
      </span>
      <span className="text-sm">{data.title}</span>
      <span></span>
      <button
        onClick={followBack}
        className="bg-sky-500 text-white p-2 text-sm rounded-lg"
      >
        Follow
      </button>
    </div>
  );
};

export default NotifContent;
