import { followersType } from "../../utils/zustand";
import ChatUserProfile from "./chat.user.profile";

interface PropsType {
  data: followersType[] | undefined;
}

const ChatUsersProfilesComponent = ({ data }: PropsType) => {
  const slideUsers = () => {};

  return (
    <div
      className={`flex gap-2 p-2 w-72 overflow-x-auto scroll-smooth`}
      onMouseDown={slideUsers}
    >
      {data?.map((d) => {
        return <ChatUserProfile userName={d.userName} />;
      })}
    </div>
  );
};

export default ChatUsersProfilesComponent;
