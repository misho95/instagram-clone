import { Avatar, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import { loadedChatUsersType, userSignIn, userType } from "../../utils/zustand";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import {
  getDataFromServerByUserName,
  addNewDataInServerStorage,
  updateDataInServerArray,
  getDataFromServerByuserId,
} from "../../utils/firebase";
import { v4 } from "uuid";

interface PropsType {
  userName: string;
  activeUserChat: (arg: loadedChatUsersType) => void;
}

const ChatUserProfile = ({ userName, activeUserChat }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [userData, setUserData] = useState<userType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);

  const waitUserData = async () => {
    //await getRealTimeUserDataWithUserName(userName, setUser);
    const userData = await getDataFromServerByUserName("users", userName);
    if (userData) {
      await getRealTimeUpdateAndSetIt("users", userData[0].id, setUserData);
    }
  };

  const createDirectMessaging = async () => {
    const data = userData;
    const user = currentUser;

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
        setCreate(true);
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
            notif: false,
          });
        } else if (directChatDataTwo.length > 0) {
          await updateDataInServerArray("users", user.id, "loadedChatUsers", {
            id: v4(),
            chatId: directChatDataTwo[0].id,
            userId: data.id,
            notif: false,
          });
        }
      }
    }

    setCreate(true);
  };

  useEffect(() => {
    if (create) {
      const findUser = currentUser?.loadedChatUsers.find((usr) => {
        if (usr.userId === userData?.id) {
          return usr;
        }
      });

      if (findUser) {
        activeUserChat(findUser);
        setCreate(false);
      }
    }
  }, [create]);

  useEffect(() => {
    waitUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }

    if (userData && userData.userActive) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [userData]);

  if (loading) {
    return <Skeleton variant="circular" width={24} height={24} />;
  }

  return (
    <>
      {show && (
        <div className="flex flex-col gap-1 items-center justify-center">
          <div onClick={createDirectMessaging} className="relative w-fit h-fit">
            <Avatar
              alt={userData?.userName}
              src={userData?.avatar}
              sx={{ width: 28, height: 28 }}
            />

            <div
              className={`absolute h-activeH w-activeW rounded-full bottom-0 -right-0 border-px1 border-white ${
                userData?.userActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
          <div className="text-sm select-none">{userData?.userName}</div>
        </div>
      )}
    </>
  );
};

export default ChatUserProfile;
