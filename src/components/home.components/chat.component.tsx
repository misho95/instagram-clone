import { loadedChatUsersType, userSignIn } from "../../utils/zustand";
import { useState } from "react";
import ChatContainer from "./chat.container";
import ChatUserLoader from "./chat.user.loader";
import ChatUsersProfilesComponent from "./chat.user.profiles.component";

const ChatComponent = () => {
  const currentUser = userSignIn((state) => state.user);
  const [userChatActive, setUserChatActive] =
    useState<loadedChatUsersType | null>();
  const [chatOpen, setChatOpen] = useState(false);

  const activeUserChat = (value: loadedChatUsersType) => {
    setUserChatActive(value);
    setChatOpen(true);
  };

  const closeChat = () => {
    setUserChatActive(null);
    setChatOpen(false);
  };

  return (
    <div className="fixed left-0 w-full z-0 py-20 sm:py-0 sm:absolute sm:left-custom top-0 h-screen sm:w-80 rounded-r-lg border-r-px1 border-r-gray-200 flex flex-col gap-3 sm:z-40 bg-white p-1 border-l-px1">
      <h1 className="text-xl font-bold p-5">Chat</h1>
      {!chatOpen && (
        <ChatUsersProfilesComponent
          data={currentUser?.following}
          activeUserChat={activeUserChat}
        />
      )}
      {!chatOpen && (
        <div className="flex flex-col gap-3 p-2">
          {currentUser?.loadedChatUsers?.map((user) => {
            return (
              <ChatUserLoader
                key={user.id}
                data={user}
                activeUserChat={activeUserChat}
              />
            );
          })}
        </div>
      )}

      {chatOpen && (
        <ChatContainer userChatActive={userChatActive} closeChat={closeChat} />
      )}
    </div>
  );
};

export default ChatComponent;
