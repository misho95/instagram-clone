import { useState, useEffect } from "react";
import ChatMessageComponent from "./chat.message.component";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import {
  directChatType,
  loadedChatUsersType,
  userSignIn,
} from "../../utils/zustand";
import { v4 } from "uuid";
import { updateDataInServerArray } from "../../utils/firebase";

interface PropsType {
  userChatActive: loadedChatUsersType | null | undefined;
  closeChat: () => void;
}

const ChatContainer = ({ userChatActive, closeChat }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<directChatType | null>(null);

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
    if (chat && currentUser) {
      await updateDataInServerArray("directChat", chat.id, "messages", {
        id: v4(),
        message: input,
        userId: currentUser.id,
      });
    }
  };

  useEffect(() => {
    waitChatDataAndSetIt();
  }, []);

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
          <div className=" w-full h-full border-b-px1 border-t-px1 border-gray-200 p-3 flex flex-col gap-3">
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
