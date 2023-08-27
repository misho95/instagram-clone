import LeftNavBar from "../components/home.components/leftNavBar";
import { activeNav } from "../utils/zustand";

const HomePage = () => {
  const setNavActive = activeNav((state) => state.setActive);

  return (
    <div className="flex">
      <LeftNavBar />
      <div
        onClick={() => setNavActive(null)}
        className="w-full pt-20 sm:pt-0 p-0 sm:pl-pxcontentmd lg:px-pxcontent min-h-screen"
      >
        Home Page
      </div>
    </div>
  );
};

export default HomePage;
