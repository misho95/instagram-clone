import { useState, useEffect, useRef, KeyboardEvent } from "react";
import ChatMessageComponent from "./chat.message.component";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import {
  directChatType,
  loadedChatUsersType,
  userSignIn,
  userType,
} from "../../utils/zustand";
import { v4 } from "uuid";
import {
  updateDataInServerArray,
  getDataFromServer,
  getDataFromServerByuserId,
  changeDataInServerWidthId,
} from "../../utils/firebase";
import EmojiPicker from "emoji-picker-react";
import { Emoji } from "emoji-picker-react";
import { Avatar } from "@mui/material";

interface PropsType {
  userChatActive: loadedChatUsersType | null | undefined;
  closeChat: () => void;
}

const ChatContainer = ({ userChatActive, closeChat }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<directChatType | null>(null);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [user, setUser] = useState<userType | null>(null);

  const waitUserData = async () => {
    if (userChatActive) {
      const userData = await getDataFromServer("users", userChatActive.userId);
      const casterUserData: userType = userData as userType;
      setUser(casterUserData);
    }
  };

  const waitChatDataAndSetIt = async () => {
    if (userChatActive) {
      await getRealTimeUpdateAndSetIt(
        "directChat",
        userChatActive.chatId,
        setChat
      );
    }
  };

  const sendNewMessage = async () => {
    if (chat && currentUser && userChatActive) {
      const messageId = v4();
      await updateDataInServerArray("directChat", chat.id, "messages", {
        id: messageId,
        message: input,
        userId: currentUser.id,
      });

      ///update Users loadedChats

      const userMessagingData = await getDataFromServer(
        "users",
        userChatActive.userId
      );

      if (userMessagingData) {
        const findUserInLoadedChatUsers =
          userMessagingData.loadedChatUsers?.find(
            (usr: loadedChatUsersType) => {
              if (usr.userId === currentUser.id) {
                return usr;
              }
            }
          );

        if (findUserInLoadedChatUsers) {
          findUserInLoadedChatUsers.notif = true;
          const notifUser = await getDataFromServer(
            "users",
            userChatActive.userId
          );

          if (notifUser) {
            const updated = notifUser.loadedChatUsers.map(
              (data: loadedChatUsersType) => {
                if (data.id === findUserInLoadedChatUsers.id) {
                  return findUserInLoadedChatUsers;
                } else {
                  return data;
                }
              }
            );

            await changeDataInServerWidthId(
              "users",
              notifUser.id,
              "loadedChatUsers",
              updated
            );
          }

          return;
        } else {
          const directChatDataOne = await getDataFromServerByuserId(
            "directChat",
            [{ userId: currentUser.id }, { userId: userMessagingData.id }]
          );

          const directChatDataTwo = await getDataFromServerByuserId(
            "directChat",
            [{ userId: userMessagingData.id }, { userId: currentUser.id }]
          );

          if (directChatDataOne.length > 0) {
            await updateDataInServerArray(
              "users",
              userMessagingData.id,
              "loadedChatUsers",
              {
                id: v4(),
                chatId: directChatDataOne[0].id,
                userId: currentUser.id,
                notif: true,
              }
            );
          } else if (directChatDataTwo.length > 0) {
            await updateDataInServerArray(
              "users",
              userMessagingData.id,
              "loadedChatUsers",
              {
                id: v4(),
                chatId: directChatDataTwo[0].id,
                userId: currentUser.id,
                notif: true,
              }
            );
          }
        }
      }
    }
  };

  const scrollToBottom = () => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (input !== "") {
        sendNewMessage();
      }
      setInput("");
      setShowEmoji(false);
    }
  };

  const updateNotif = async () => {
    if (userChatActive && currentUser) {
      const updatedNotif = userChatActive;
      updatedNotif.notif = false;
      const updated = currentUser?.loadedChatUsers.map((data) => {
        if (data.id === userChatActive?.id) {
          return updatedNotif;
        } else {
          return data;
        }
      });
      await changeDataInServerWidthId(
        "users",
        currentUser.id,
        "loadedChatUsers",
        updated
      );
    }
  };

  const handleEmoji = (emojiObj: any) => {
    setInput(input + emojiObj.emoji);
  };

  useEffect(() => {
    waitChatDataAndSetIt();
    waitUserData();
  }, []);

  useEffect(() => {
    updateNotif();
  }, [chat, userChatActive]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <>
      <button
        onClick={closeChat}
        className="text-left flex gap-1 items-center text-red-500"
      >
        <span className="material-symbols-outlined">close</span>
        Close Chat
      </button>
      {!chat && <div className="p-2 text-gray-500">no chat loaded</div>}
      <div className="p-2 flex gap-2 items-center">
        <Avatar
          alt={user?.userName}
          src={user?.avatar}
          sx={{ width: 18, height: 18 }}
        />

        <span className="text-lg font-bold">{user?.userName}</span>
      </div>
      {chat && (
        <div className="w-full h-full flex flex-col gap-3">
          <div
            ref={chatContainer}
            className="w-full h-customScreenHeigthMobile sm:h-customScreenHeigth border-b-px1 border-t-px1 border-gray-200 p-3 flex flex-col gap-3 overflow-y-auto"
          >
            {chat &&
              chat.messages.map((mes) => {
                return <ChatMessageComponent key={mes.id} data={mes} />;
              })}
          </div>
          <div className="relative">
            <textarea
              className="w-full bg-gray-200/80 rounded-md resize-none p-2 focus:outline-none pr-20"
              placeholder="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 items-center gap-2 flex">
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className="hidden sm:flex"
              >
                <Emoji unified="1f603" size={25} />
              </button>
              <button
                onClick={() => {
                  sendNewMessage(), setInput(""), setShowEmoji(false);
                }}
                disabled={input === "" ? true : false}
                className={` ${input === "" ? "text-sky-200" : "text-sky-500"}`}
              >
                Send
              </button>
            </div>
            {showEmoji && (
              <div className="absolute bottom-24 right-1 hidden sm:flex">
                <EmojiPicker onEmojiClick={(e) => handleEmoji(e)} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
