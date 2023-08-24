import { userSignIn } from "../../utils/zustand";
import { Link } from "react-router-dom";
import NavBarLinks from "./nav.bar.links";

const LeftNavBar = () => {
  const user = userSignIn((state) => state.user);

  if (!user) {
    return;
  }

  return (
    <div className="fixed border-r-px1 border-gray-200 z-50 bg-red-500 p-6 w-full h-20 bottom-0 sm:w-fit sm:h-screen flex flex-row sm:flex-col justify-around sm:justify-start gap-5">
      <NavBarLinks />
      <NavBarLinks />
      <NavBarLinks />
      <NavBarLinks />
      <NavBarLinks />
    </div>
  );
};

export default LeftNavBar;
