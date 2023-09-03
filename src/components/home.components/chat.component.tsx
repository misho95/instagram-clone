import { activeChat, directChatType, userSignIn } from "../../utils/zustand";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import { useState, useEffect } from "react";
import { updateDataInServerArray } from "../../utils/firebase";
import { v4 } from "uuid";
import ChatMessageComponent from "./chat.message.component";

const ChatComponent = () => {
  const currentUser = userSignIn((state) => state.user);
  const chatActive = activeChat((state) => state.active);
  const [chat, setChat] = useState<directChatType | null>(null);
  const [input, setInput] = useState("");

  const waitChatDataAndSetIt = async () => {
    if (chatActive) {
      await getRealTimeUpdateAndSetIt("directChat", chatActive.chatId, setChat);
    }
  };

  const sendNewMessage = async () => {
    if (chat && currentUser) {
      await updateDataInServerArray("directChat", chat.id, "messages", {
        id: v4(),
        message: input,
        userId: currentUser.id,
      });
      setInput("");
    }
  };

  useEffect(() => {
    waitChatDataAndSetIt();
  }, []);

  return (
    <div className="absolute left-custom top-0 h-screen w-80 rounded-r-lg border-r-px1 border-r-gray-200 hidden sm:flex flex-col gap-3 z-50 bg-white p-1">
      <h1 className="text-xl font-bold p-5">Chat</h1>
      {!chat && <div className="p-2 text-gray-500">no chat loaded</div>}
      {chat && (
        <div className="w-full h-full flex flex-col gap-3">
          <div className=" w-full h-full border-b-px1 border-t-px1 border-gray-200 p-3 flex flex-col gap-3">
            {chat &&
              chat.messages.map((mes) => {
                return <ChatMessageComponent data={mes} />;
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
              onClick={sendNewMessage}
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
    </div>
  );
};

export default ChatComponent;
