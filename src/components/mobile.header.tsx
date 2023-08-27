import { useState, useEffect } from "react";
import { getDataFromServerByUserName } from "../utils/firebase";
import { Link } from "react-router-dom";
import { userType } from "../utils/zustand";

const MobileHeader = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<userType[] | null>(null);

  const waitDataFromServer = async () => {
    const data = await getDataFromServerByUserName("users", search);
    setSearchResult(data);
  };

  useEffect(() => {
    if (search !== "") {
      waitDataFromServer();
    } else {
      setSearchResult(null);
    }
  }, [search]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center sm:hidden border-b-px1 border-gray-200 p-3">
        <h1 className="font-bold text-lg">Instagram</h1>
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
                  <Link
                    key={user.id}
                    to={`/${user.userName}`}
                    onClick={() => {
                      setSearchResult(null), setSearch("");
                    }}
                    className="p-2 flex items-center gap-3 hover:bg-gray-200/70 rounded-md"
                  >
                    <img src={user.avatar} className="w-6 h-6 rounded-full" />
                    {user.userName}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <button>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
    </>
  );
};

export default MobileHeader;
