import LeftNavBar from "../components/home.components/leftNavBar";
import { activeNav } from "../utils/zustand";

const ArchiveStories = () => {
  const setNavActive = activeNav((state) => state.setActive);
  return (
    <div>
      <LeftNavBar />
      <div
        onClick={() => setNavActive(null)}
        className="w-full pt-20 sm:pt-0 min-h-screen p-0 sm:pl-pxcontentmd lg:px-pxcontent"
      >
        Archive Stories
      </div>
    </div>
  );
};

export default ArchiveStories;
