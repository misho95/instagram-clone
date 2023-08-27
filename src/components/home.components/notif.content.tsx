import { useEffect, useState } from "react";
import { notifType, userSignIn } from "../../utils/zustand";
import {
  getDataFromServer,
  updateDataInServerArray,
  deleteDataInServerArray,
} from "../../utils/firebase";
import { userType } from "../../utils/zustand";

interface PropsType {
  data: notifType;
}

const NotifContent = ({ data }: PropsType) => {
  const user = userSignIn((state) => state.user);
  const [userInfo, setUserInfo] = useState<userType | undefined>();

  const waitUserInfo = async () => {
    const user = await getDataFromServer("users", data.userId);
    setUserInfo(user);
  };

  useEffect(() => {
    waitUserInfo();
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
        <img src={userInfo?.avatar} className="w-6 h-6 rounded-full" />
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
