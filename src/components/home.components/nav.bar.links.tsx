import { Link } from "react-router-dom";

const NavBarLinks = ({ icons, name }) => {
  return (
    <Link to="/" className="flex gap-5 items-center">
      <span className="material-symbols-outlined">{icons}</span>
      <span className="hidden lg:block">{name}</span>
    </Link>
  );
};

export default NavBarLinks;
