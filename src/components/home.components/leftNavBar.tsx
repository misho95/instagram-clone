import { userSignIn, activeNav } from "../../utils/zustand";
import NavBarLinks from "./nav.bar.links";
import { useState } from "react";
import { singOutCurrentUser } from "../../utils/firebase";
import { Link } from "react-router-dom";
import SearchComponent from "./search.component";
import NotifComponent from "./notif.component";

const LeftNavBar = () => {
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);
  const [openMore, setOpenMore] = useState(false);
  const navActive = activeNav((state) => state.active);
  const setNavActive = activeNav((state) => state.setActive);

  const logOutUser = () => {
    singOutCurrentUser();
    setUser(null);
  };

  return (
    <div className="fixed border-t-px1 sm:border-r-px1 border-gray-200 z-50 p-6 w-full h-20 bottom-0 sm:w-fit sm:h-screen flex flex-col justify-between gap-3 bg-white">
      {navActive === "search" && <SearchComponent />}
      {navActive === "notif" && <NotifComponent />}
      <div className="flex flex-row sm:flex-col justify-around sm:justify-start gap-3">
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"home"}
          name={"Home"}
          link={"/"}
          mobile={"show"}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive("search");
          }}
          icons={"search"}
          name={"Search"}
          link={"/"}
          mobile={"hidden"}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"explore"}
          name={"Explore"}
          link={"/"}
          mobile={"show"}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"movie"}
          name={"Reels"}
          link={"/"}
          mobile={"show"}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"chat"}
          name={"Messages"}
          link={"/"}
          mobile={"show"}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive("notif");
          }}
          icons={"favorite"}
          name={"Notifications"}
          link={"/"}
          mobile={"hidden"}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"add_box"}
          name={"Create"}
          link={"/"}
          mobile={"show"}
        />

        <Link
          onClick={() => setNavActive(null)}
          to={`/${user?.userName}`}
          className="flex gap-5 items-center"
        >
          <span className="material-symbols-outlined">
            <img src={user?.avatar} className="w-6 h-6 rounded-full" />
          </span>
          <span
            className={`${navActive !== null ? "hidden" : "hidden lg:block"}`}
          >
            Profile
          </span>
        </Link>
      </div>
      <div className="hidden sm:block h-fit">
        {openMore && (
          <div className="flex flex-col w-40 bg-white shadow-sm shadow-gray-300 mb-5 gap-3 p-2 ">
            <button className="hover:bg-gray-100 w-full p-3 rounded-md">
              Settings
            </button>
            <button className="hover:bg-gray-100 w-full p-3 rounded-md">
              Switch accounts
            </button>
            <button
              onClick={logOutUser}
              className="hover:bg-gray-100 w-full p-3 rounded-md"
            >
              Log out
            </button>
          </div>
        )}
        <NavBarLinks
          onClickHandler={() => setOpenMore(!openMore)}
          icons={"menu"}
          name={"More"}
          link={``}
          mobile={"hidden"}
        />
      </div>
    </div>
  );
};

export default LeftNavBar;
