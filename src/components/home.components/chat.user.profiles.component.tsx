import { followersType, loadedChatUsersType } from "../../utils/zustand";
import ChatUserProfile from "./chat.user.profile";

interface PropsType {
  data: followersType[] | undefined;
  activeUserChat: (arg: loadedChatUsersType) => void;
}

const ChatUsersProfilesComponent = ({ data, activeUserChat }: PropsType) => {
  const slideUsers = () => {};

  return (
    <div
      className={`flex gap-2 p-2 w-72 overflow-x-auto scroll-smooth`}
      onMouseDown={slideUsers}
    >
      {data?.map((d) => {
        return (
          <ChatUserProfile
            key={d.id}
            userName={d.userName}
            activeUserChat={activeUserChat}
          />
        );
      })}
    </div>
  );
};

export default ChatUsersProfilesComponent;
