import { userSignIn } from "../../utils/zustand";

const LeftNavBar = () => {
  const user = userSignIn((state) => state.user);

  return (
    <div className="p-10 w-80 h-screen border-r-px1 border-gray-200">
      <h1 className="p-3 text-2xl font-bold">Instagram</h1>
      <div className="flex flex-col gap-8">
        <span className="flex gap-2 items-center">
          <span className="material-symbols-outlined">home</span>Home
        </span>
        <span className="flex gap-2 items-center">
          <span className="material-symbols-outlined">search</span>Search
        </span>
        <span className="flex gap-2 items-center">
          <span className="material-symbols-outlined">explore</span>Expore
        </span>
        <span>Reels</span>
        <span>Messages</span>
        <span>Notification</span>
        <span>Create</span>
        <span className="flex gap-2 items-center">
          <img src={user?.avatar} className="w-6 h-6 rounded-full" />
          Profile
        </span>
      </div>
    </div>
  );
};

export default LeftNavBar;
