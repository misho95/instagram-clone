import {
  getDataFromServer,
  deleteDataInServerArray,
} from "../../utils/firebase";
import { useState, useEffect } from "react";
import { userType, followersType, userSignIn } from "../../utils/zustand";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

interface PropsType {
  data: followersType;
  set: (arg: boolean) => void;
  type: string;
  userType: string;
}

const FollowUser = ({ data, set, type, userType }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();
  const currentUser = userSignIn((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const waitFetcher = async () => {
    const userData = await getDataFromServer("users", data.id);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  const unFollowUser = async (id: string | undefined) => {
    if (id) {
      const data = await getDataFromServer("users", id);
      if (data) {
        const obj = {
          id: data.id,
          userName: data.userName,
        };
        if (currentUser) {
          const currentUserObj = {
            id: currentUser?.id,
            userName: currentUser?.userName,
          };
          await deleteDataInServerArray(
            "users",
            currentUser?.id,
            "following",
            obj
          );
          await deleteDataInServerArray(
            "users",
            data.id,
            "followers",
            currentUserObj
          );
        }
      }
    }
  };

  useEffect(() => {
    waitFetcher();
  }, []);

  useEffect(() => {
    if (user) {
      const img = new Image();
      img.src = user.avatar;
      img.onload = () => {
        setLoading(true);
      };
    }
  }, [user]);

  return (
    <div className="flex justify-between items-center gap-3">
      {!loading && (
        <div className="flex items-center justify-between w-full">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rounded" width={150} height={10} />
        </div>
      )}
      {loading && (
        <Link
          onClick={() => set(false)}
          to={`/${user?.userName}`}
          className="flex gap-3"
        >
          <img
            src={user?.avatar}
            alt={user?.userName}
            className="w-8 h-8 rounded-full object-cover"
          />
          {user?.userName}
        </Link>
      )}
      {loading && userType === "owner" && type === "followings" && (
        <button
          onClick={() => unFollowUser(user?.id)}
          className="bg-sky-500 text-white p-1 rounded-lg"
        >
          Unfollow
        </button>
      )}
    </div>
  );
};

export default FollowUser;
