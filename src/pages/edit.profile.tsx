import LeftNavBar from "../components/home.components/leftNavBar";
import { userSignIn, activeNav } from "../utils/zustand";

const EditProfile = () => {
  const user = userSignIn((state) => state.user);
  const setNavActive = activeNav((state) => state.setActive);

  return (
    <div>
      <LeftNavBar />
      <div
        onClick={() => setNavActive(null)}
        className="w-full p-0 sm:pl-pxcontentmd lg:px-pxcontent min-h-screen"
      >
        <h1 className="text-xl font-bold p-5">Settings</h1>
        <div className="p-5 border-px1 border-gray-200">
          <h1 className="text-xl font-bold">Edit profile</h1>
          <div className="p-5 flex gap-5 items-center">
            <img
              src={user?.avatar}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <span>{user?.userName}</span>
              <button className="text-sky-500">Change profile photo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
