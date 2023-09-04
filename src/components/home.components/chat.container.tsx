import { useState, useEffect, useRef, KeyboardEvent } from "react";
import ChatMessageComponent from "./chat.message.component";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import {
  directChatType,
  loadedChatUsersType,
  userSignIn,
} from "../../utils/zustand";
import { v4 } from "uuid";
import {
  addNewDataInServerStorage,
  updateDataInServerArray,
  getDataFromServer,
  getDataFromServerByuserId,
} from "../../utils/firebase";

interface PropsType {
  userChatActive: loadedChatUsersType | null | undefined;
  closeChat: () => void;
}

const ChatContainer = ({ userChatActive, closeChat }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<directChatType | null>(null);
  const chatContainer = useRef<HTMLDivElement | null>(null);

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
              }
            );
          }
        }
      }

      //update data in chatSeen

      await addNewDataInServerStorage("chatSeen", messageId, {
        id: messageId,
        chatId: userChatActive.chatId,
        usersSeen: [],
      });
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
      if (input !== "" || input !== "") {
        sendNewMessage();
      }
      setInput("");
    }
  };

  useEffect(() => {
    waitChatDataAndSetIt();
  }, []);

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
              className="w-full bg-gray-200/80 rounded-md resize-none p-2 focus:outline-none"
              placeholder="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={() => {
                sendNewMessage(), setInput("");
              }}
              disabled={input === "" ? true : false}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                input === "" ? "text-sky-200" : "text-sky-500"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
