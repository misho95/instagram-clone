const MobileHeader = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center sm:hidden border-b-px1 border-gray-200 p-3">
      <h1 className="font-bold text-lg">Instagram</h1>
      <input
        type="search"
        placeholder="search"
        className="bg-gray-200/70 rounded-lg p-1 focus:outline-none"
      />
      <button>
        <span className="material-symbols-outlined">favorite</span>
      </button>
    </div>
  );
};

export default MobileHeader;
