import { useState, useEffect } from "react";
import { getDataFromServerByUserName } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { activeNav, userType } from "../../utils/zustand";

const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<userType[]>();
  const setActiveNav = activeNav((state) => state.setActive);

  const waitDataFromServer = async () => {
    const data = await getDataFromServerByUserName("users", search);
    setSearchResult(data);
  };

  useEffect(() => {
    waitDataFromServer();
  }, [search]);

  return (
    <div className="absolute left-custom top-0 h-screen w-80 rounded-r-lg border-r-px1 border-r-gray-200 hidden sm:flex flex-col gap-3">
      <h1 className="text-xl font-bold p-5">Search</h1>
      <div className="border-b-px1 border-gray-200 p-5">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          placeholder="search"
          className="p-2 bg-gray-200/70 rounded-lg w-full focus:outline-none"
        />
      </div>
      <div className="p-5 flex flex-col gap-5">
        {searchResult?.map((user: userType) => {
          return (
            <Link
              key={user.id}
              to={`/${user.userName}`}
              onClick={() => setActiveNav(null)}
              className="p-2 flex items-center gap-3 hover:bg-gray-200/70 rounded-md"
            >
              <img src={user.avatar} className="w-6 h-6 rounded-full" />
              {user.userName}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchComponent;