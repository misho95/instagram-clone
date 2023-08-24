import { Link } from "react-router-dom";
import LeftNavBar from "../components/home.components/leftNavBar";

import { userSignIn } from "../utils/zustand";

const HomePage = () => {
  const user = userSignIn((state) => state.user);

  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex">
      <LeftNavBar />
      Home Page
    </div>
  );
};

export default HomePage;
