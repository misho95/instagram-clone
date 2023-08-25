import { Link } from "react-router-dom";

interface PropsType {
  icons: string;
  name: string;
  link: string;
  onClickHandler: () => void;
}

const NavBarLinks = ({ icons, name, link, onClickHandler }: PropsType) => {
  return (
    <Link
      onClick={onClickHandler}
      to={link}
      className="flex gap-5 items-center"
    >
      <span className="material-symbols-outlined">{icons}</span>
      <span className="hidden lg:block">{name}</span>
    </Link>
  );
};

export default NavBarLinks;
