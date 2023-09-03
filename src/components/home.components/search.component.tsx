import { useState, useEffect } from "react";
import { getCollectionFromServer } from "../../utils/firebase";
import { activeNav, userType } from "../../utils/zustand";
import SearchUser from "./search.user";

const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<userType[]>();
  const setActiveNav = activeNav((state) => state.setActive);

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
    waitDataFromServer();
  }, [search]);

  return (
    <div className="absolute left-custom top-0 h-screen w-80 rounded-r-lg border-r-px1 border-r-gray-200 hidden sm:flex flex-col gap-3 z-30 bg-white">
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
          return <SearchUser key={user.id} user={user} set={setActiveNav} />;
        })}
      </div>
    </div>
  );
};

export default SearchComponent;
