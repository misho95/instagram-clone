import { useState, useEffect } from "react";
import { getCollectionFromServer } from "../utils/firebase";
import { Link } from "react-router-dom";
import { userSignIn, userType } from "../utils/zustand";
import SearchUser from "./home.components/search.user";

const MobileHeader = () => {
  const user = userSignIn((state) => state.user);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<userType[] | null>(null);
  const [notifCount, setNotifCount] = useState(0);

  const waitDataFromServer = async () => {
    const data = await getCollectionFromServer("users");
    const filterData = data.filter((d: userType) => {
      if (
        search !== "" &&
        d.userName.toLowerCase().includes(search.toLowerCase())
      ) {
        return d;
      } else {
        return;
      }
    });
    setSearchResult(filterData);
  };

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

  useEffect(() => {
    if (search !== "") {
      waitDataFromServer();
    } else {
      setSearchResult(null);
    }
  }, [search]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center sm:hidden border-b-px1 border-gray-200 p-3 bg-white z-50">
        <Link to="/" className="font-bold text-lg">
          Instagram
        </Link>
        <div className="w-fit relative">
          <input
            type="search"
            placeholder="search"
            className="bg-gray-200/70 rounded-lg p-1 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchResult && searchResult.length > 0 && (
            <div className="absolute inset-y-10 bg-white shadow-sm p-5 rounded-md border-px1 border-gray-200 h-fit">
              {searchResult?.map((user: userType) => {
                return (
                  <SearchUser
                    key={user.id}
                    user={user}
                    set={() => {
                      setSearchResult(null), setSearch("");
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="w-fit h-fit relative">
          <button>
            <span className="material-symbols-outlined">favorite</span>
          </button>
          {notifCount !== 0 && (
            <div className="bg-red-500 absolute -left-1 -top-1 rounded-full flex items-center justify-center w-4 h-4 text-xs text-white">
              {notifCount}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
