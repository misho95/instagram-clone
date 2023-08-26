const SearchComponent = () => {
  return (
    <div className="absolute left-custom top-0 h-screen w-80 rounded-r-lg border-r-px1 border-r-gray-200 hidden sm:flex flex-col gap-3">
      <h1 className="text-xl font-bold p-5">Search</h1>
      <div className="border-b-px1 border-gray-200 p-5">
        <input
          type="search"
          placeholder="search"
          className="p-2 bg-gray-200/70 rounded-lg w-full focus:outline-none"
        />
      </div>
      <div className="p-5">search result</div>
    </div>
  );
};

export default SearchComponent;
