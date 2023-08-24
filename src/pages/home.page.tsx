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
      <div className="lg:pl-96">Home Page</div>
    </div>
  );
};

export default HomePage;
