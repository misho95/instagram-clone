import { Link } from "react-router-dom";

const NavBarLinks = () => {
  const open = true;

  return (
    <Link to="/" className="flex gap-5 items-center">
      <span className="material-symbols-outlined">favorite</span>
      {!open && <span className="hidden sm:block">Link Name</span>}
    </Link>
  );
};

export default NavBarLinks;
