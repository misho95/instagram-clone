import { userSignIn } from "../../utils/zustand";
import { Link } from "react-router-dom";
import NavBarLinks from "./nav.bar.links";

const LeftNavBar = () => {
  const user = userSignIn((state) => state.user);

  if (!user) {
    return;
  }

  return (
    <div className="fixed border-t-px1 sm:border-r-px1 border-gray-200 z-50 p-6 w-full h-20 bottom-0 sm:w-fit sm:h-screen flex flex-row sm:flex-col justify-around sm:justify-start gap-5">
      <NavBarLinks icons={"home"} name={"Home"} />
      <NavBarLinks icons={"search"} name={"Search"} />
      <NavBarLinks icons={"explore"} name={"Explore"} />
      <NavBarLinks icons={"movie"} name={"Reels"} />
      <NavBarLinks icons={"chat"} name={"Messages"} />
      <NavBarLinks icons={"favorite"} name={"Notifications"} />
      <NavBarLinks icons={"add_box"} name={"Create"} />
      <NavBarLinks icons={"account_circle"} name={"Profile"} />
    </div>
  );
};

export default LeftNavBar;
