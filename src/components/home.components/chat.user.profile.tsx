import { Avatar, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import { userType } from "../../utils/zustand";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import { getDataFromServerByUserName } from "../../utils/firebase";

interface PropsType {
  userName: string;
}

const ChatUserProfile = ({ userName }: PropsType) => {
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);

  const waitUserData = async () => {
    //await getRealTimeUserDataWithUserName(userName, setUser);
    const userData = await getDataFromServerByUserName("users", userName);
    if (userData) {
      await getRealTimeUpdateAndSetIt("users", userData[0].id, setUser);
    }
  };

  useEffect(() => {
    waitUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }

    if (user && user.userActive) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [user]);

  if (loading) {
    return <Skeleton variant="circular" width={24} height={24} />;
  }

  return (
    <>
      {show && (
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="relative w-fit h-fit">
            <Avatar
              alt={user?.userName}
              src={user?.avatar}
              sx={{ width: 28, height: 28 }}
            />

            <div
              className={`absolute h-activeH w-activeW rounded-full bottom-0 -right-0 border-px1 border-white ${
                user?.userActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
          <div className="text-sm select-none">{user?.userName}</div>
        </div>
      )}
    </>
  );
};

export default ChatUserProfile;
