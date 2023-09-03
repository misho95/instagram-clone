import {
  userType,
  userSignIn,
  activeNav,
  directChatType,
} from "../../utils/zustand";
import {
  getDataFromServer,
  updateDataInServerArray,
  deleteDataInServerArray,
  addNewDataInServerStorage,
  getDataFromServerByuserId,
} from "../../utils/firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SettingsModal from "./settings.modal";
import { v4 } from "uuid";
import FollowModalComponent from "./follow.modal.component";
import { Avatar } from "@mui/material";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const ProfileHeader = ({ type, data }: propsType) => {
  const user = userSignIn((state) => state.user);
  const setNavActive = activeNav((state) => state.setActive);
  const [following, setFollowing] = useState<boolean>(false);
  const [openSettingModal, setOpenSettingsModal] = useState<boolean>(false);
  const [showFollowers, setShowFollowers] = useState<boolean>(false);
  const [showFollowings, setShowFollowins] = useState<boolean>(false);

  const followUser = async (id: string) => {
    const data = await getDataFromServer("users", id);
    if (data) {
      const obj = {
        id: data.id,
        userName: data.userName,
      };
      if (user) {
        await updateDataInServerArray("users", user?.id, "following", obj);

        const currentUserObj = {
          id: user?.id,
          userName: user?.userName,
        };

        await updateDataInServerArray(
          "users",
          data.id,
          "followers",
          currentUserObj
        );

        await updateDataInServerArray("users", data.id, "notif", {
          id: v4(),
          title: `${user?.userName} Started following you`,
          userId: user?.id,
          seen: false,
        });
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
        const currentUserObj = {
          id: user?.id,
          userName: user?.userName,
        };
        await deleteDataInServerArray("users", user?.id, "following", obj);
        await deleteDataInServerArray(
          "users",
          data.id,
          "followers",
          currentUserObj
        );
      }
    }
    setFollowing(false);
  };

  const createDirectMessaging = async () => {
    setNavActive("chat");

    if (user && data) {
      const findUserChat = user.chats?.find((c) => {
        if (c.userId === data.id) {
          return c;
        }
      });

      const ID = v4();
      // const chatDataToSend = { id: v4(), chatId: ID, userId: data.id };

      if (!findUserChat) {
        await addNewDataInServerStorage("directChat", ID, {
          id: ID,
          users: [{ userId: user.id }, { userId: data.id }],
          messages: [],
        });
        await updateDataInServerArray("users", user.id, "chats", {
          id: v4(),
          chatId: ID,
          userId: data.id,
        });
        await updateDataInServerArray("users", data.id, "chats", {
          id: v4(),
          chatId: ID,
          userId: user.id,
        });
      }

      const findUserInLoadedChatUsers = user.loadedChatUsers?.find((usr) => {
        if (usr.userId === data.id) {
          return usr;
        }
      });

      if (findUserInLoadedChatUsers) {
        return;
      } else {
        const directChatDataOne = await getDataFromServerByuserId(
          "directChat",
          [{ userId: user.id }, { userId: data.id }]
        );

        const directChatDataTwo = await getDataFromServerByuserId(
          "directChat",
          [{ userId: data.id }, { userId: user.id }]
        );

        if (directChatDataOne.length > 0) {
          await updateDataInServerArray("users", user.id, "loadedChatUsers", {
            id: v4(),
            chatId: directChatDataOne[0].id,
            userId: data.id,
          });
        } else if (directChatDataTwo.length > 0) {
          await updateDataInServerArray("users", user.id, "loadedChatUsers", {
            id: v4(),
            chatId: directChatDataTwo[0].id,
            userId: data.id,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (user?.following) {
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
    <>
      {openSettingModal && (
        <SettingsModal setOpenSettingsModal={setOpenSettingsModal} />
      )}
      <div className="flex w-full items-center justify-center gap-10 pt-10">
        <div className="hidden sm:block">
          <Avatar
            alt={data?.userName}
            src={data?.avatar}
            sx={{ width: 160, height: 160, fontSize: 40 }}
          />
        </div>
        <div className="block sm:hidden">
          <Avatar
            alt={data?.userName}
            src={data?.avatar}
            sx={{ width: 80, height: 80, fontSize: 30 }}
          />
        </div>
        <div className="w-fit">
          <div className="hidden sm:flex gap-5 p-5 items-center">
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
                  {following ? "unfollow" : "follow"}
                </button>
              ) : (
                <Link
                  to="/account/edit"
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                >
                  Edit Profile
                </Link>
              )}
            </span>
            <span>
              {type === "user" ? (
                <button
                  onClick={(event) => {
                    event.stopPropagation(), createDirectMessaging();
                  }}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                >
                  Message
                </button>
              ) : (
                <Link
                  to={"/archive/stories"}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                >
                  View Archive
                </Link>
              )}
            </span>
            <span>
              {type === "user" ? (
                <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              ) : (
                <button
                  onClick={() => setOpenSettingsModal(!openSettingModal)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex"
                >
                  <span className="material-symbols-outlined">settings</span>
                </button>
              )}
            </span>
          </div>
          {/* for mobile version */}
          <div className="flex flex-col sm:hidden gap-5 p-5 items-center">
            <div className="flex w-full justify-between items-center">
              <span>{data?.userName}</span>
              <span>
                {type === "user" ? (
                  <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex">
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenSettingsModal(!openSettingModal)}
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex"
                  >
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                )}
              </span>
            </div>
            <div className="flex w-full justify-between gap-3">
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
                    {following ? "unfollow" : "follow"}
                  </button>
                ) : (
                  <Link
                    to="/account/edit"
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                  >
                    Edit Profile
                  </Link>
                )}
              </span>
              <span>
                {type === "user" ? (
                  <button
                    onClick={(event) => {
                      event.stopPropagation(), createDirectMessaging();
                    }}
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                  >
                    Message
                  </button>
                ) : (
                  <Link
                    to={"/archive/stories"}
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2"
                  >
                    View Archive
                  </Link>
                )}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex justify-around">
            <span>{data?.posts ? data?.posts?.length : 0} posts</span>
            <span
              className="cursor-pointer"
              onClick={() => setShowFollowers(true)}
            >
              {data?.followers ? data?.followers?.length : 0} followers
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setShowFollowins(true)}
            >
              {data?.following ? data?.following?.length : 0} following
            </span>
          </div>
        </div>
      </div>
      {/* followrs modal */}
      {showFollowers && (
        <FollowModalComponent
          data={data}
          type={"followers"}
          set={setShowFollowers}
          userType={type}
        />
      )}
      {showFollowings && (
        <FollowModalComponent
          data={data}
          type={"followings"}
          set={setShowFollowins}
          userType={type}
        />
      )}
      <div className="flex sm:hidden justify-around">
        <span>{data?.posts ? data?.posts?.length : 0} posts</span>
        <span className="cursor-pointer" onClick={() => setShowFollowers(true)}>
          {data?.followers ? data?.followers?.length : 0} followers
        </span>
        <span className="cursor-pointer" onClick={() => setShowFollowins(true)}>
          {data?.following ? data?.following?.length : 0} following
        </span>
      </div>
    </>
  );
};

export default ProfileHeader;
