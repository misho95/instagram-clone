import { userSignIn, activeNav } from "../../utils/zustand";
import NavBarLinks from "./nav.bar.links";
import { useState, useEffect } from "react";
import { singOutCurrentUser } from "../../utils/firebase";
import { Link } from "react-router-dom";
import SearchComponent from "./search.component";
import NotifComponent from "./notif.component";
import PostModal from "./post.modal";

const LeftNavBar = () => {
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);
  const [openMore, setOpenMore] = useState(false);
  const navActive = activeNav((state) => state.active);
  const setNavActive = activeNav((state) => state.setActive);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    if (user?.notif) {
      const filterUnseenNotif = user?.notif.filter((n) => {
        if (n.seen === false) {
          return n;
        }
      });

      if (filterUnseenNotif) {
        const countNotif = filterUnseenNotif.reduce((val) => {
          return (val += 1);
        }, 0);
        setNotifCount(countNotif);
      }
    }
  }, [user]);

  const logOutUser = () => {
    singOutCurrentUser();
    setUser(null);
  };

  return (
    <div className="fixed border-t-px1 sm:border-r-px1 border-gray-200 p-6 w-full h-20 bottom-0 sm:w-fit sm:h-screen flex flex-col justify-between gap-3 bg-white z-50">
      {navActive === "search" && <SearchComponent />}
      {navActive === "notif" && <NotifComponent />}
      <div className="flex flex-row sm:flex-col justify-evenly sm:justify-start sm:gap-3">
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"home"}
          name={"Home"}
          link={"/"}
          mobile={"show"}
          notif={0}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive("search");
          }}
          icons={"search"}
          name={"Search"}
          link={""}
          mobile={"hidden"}
          notif={0}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"explore"}
          name={"Explore"}
          link={"/"}
          mobile={"show"}
          notif={0}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"movie"}
          name={"Reels"}
          link={"/"}
          mobile={"show"}
          notif={0}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive(null);
          }}
          icons={"chat"}
          name={"Messages"}
          link={"/"}
          mobile={"show"}
          notif={0}
        />
        <NavBarLinks
          onClickHandler={() => {
            setNavActive("notif");
          }}
          icons={"favorite"}
          name={"Notifications"}
          link={""}
          mobile={"hidden"}
          notif={notifCount}
        />
        <NavBarLinks
          onClickHandler={() => {
            setOpenPostModal(!openPostModal);
          }}
          icons={"add_box"}
          name={"Create"}
          link={""}
          mobile={"show"}
          notif={0}
        />
        {openPostModal && <PostModal setOpenPostModal={setOpenPostModal} />}
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
          notif={0}
        />
      </div>
    </div>
  );
};

export default LeftNavBar;
