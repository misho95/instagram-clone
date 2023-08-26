import LeftNavBar from "../components/home.components/leftNavBar";

// import { userSignIn } from "../utils/zustand";

const HomePage = () => {
  //const user = userSignIn((state) => state.user);

  return (
    <div className="flex">
      <LeftNavBar />
      <div className="w-full p-0 sm:pl-pxcontentmd lg:px-pxcontent">
        Home Page
      </div>
    </div>
  );
};

export default HomePage;
