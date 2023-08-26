import { userType, userSignIn } from "../../utils/zustand";
import {
  getDataFromServer,
  updateDataInServerArray,
  deleteDataInServerArray,
} from "../../utils/firebase";
import { useState, useEffect } from "react";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const ProfileHeader = ({ type, data }: propsType) => {
  const user = userSignIn((state) => state.user);
  const [following, setFollowing] = useState(false);

  const followUser = async (id: string) => {
    const data = await getDataFromServer("users", id);
    if (data) {
      const obj = {
        id: data.id,
        userName: data.userName,
      };
      if (user) {
        await updateDataInServerArray("users", user?.id, "following", obj);
      }
    }
  };

  const unFollowUser = async (id: string) => {
    const data = await getDataFromServer("users", id);
    if (data) {
      const obj = {
        id: data.id,
        userName: data.userName,
      };
      if (user) {
        await deleteDataInServerArray("users", user?.id, "following", obj);
      }
    }
    setFollowing(false);
  };

  useEffect(() => {
    if (user) {
      const find = user.following.find((usr) => {
        if (usr.id === data?.id) {
          return usr;
        }
      });
      if (find) {
        setFollowing(true);
        return;
      }
    }
  }, [data, user]);

  return (
    <div className="flex w-full items-center justify-center gap-10 pt-10">
      <div>
        <img
          src={data?.avatar}
          className="w-40 h-40 rounded-full object-cover"
        />
      </div>
      <div className="w-fit">
        <div className="flex gap-5 p-5 items-center">
          <span>{data?.userName}</span>
          <span>
            {type === "user" ? (
              <button
                onClick={() => {
                  following
                    ? data && unFollowUser(data?.id)
                    : data && followUser(data?.id);
                }}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
              >
                {following ? "following" : "follow"}
              </button>
            ) : (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                Edit Profile
              </button>
            )}
          </span>
          <span>
            {type === "user" ? (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                Message
              </button>
            ) : (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                View Archive
              </button>
            )}
          </span>
          <span>
            {type === "user" ? (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            ) : (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex">
                <span className="material-symbols-outlined">settings</span>
              </button>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>35 posts</span>
          <span>75 followers</span>
          <span>89 following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
