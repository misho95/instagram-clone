import FeedsPage from "../components/feeds.components/feeds.page";
import LeftNavBar from "../components/home.components/leftNavBar";
import { activeNav, userSignIn } from "../utils/zustand";
import { updateDataInServer } from "../utils/firebase";
import { useEffect } from "react";

const HomePage = () => {
  const setNavActive = activeNav((state) => state.setActive);
  const user = userSignIn((state) => state.user);

  const waitUserUpdate = async () => {
    if (user) {
      await updateDataInServer("users", user.id, "userActive", true);
      console.log("testing");
    }
  };

  useEffect(() => {
    waitUserUpdate();
  }, []);

  return (
    <div className="flex">
      <LeftNavBar />
      <div
        onClick={() => setNavActive(null)}
        className="w-full pt-20 sm:pt-0 p-0 sm:pl-pxcontentmd lg:px-pxcontent min-h-screen"
      >
        <FeedsPage />
      </div>
    </div>
  );
};

export default HomePage;
