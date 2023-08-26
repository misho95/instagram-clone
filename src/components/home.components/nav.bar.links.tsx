import { Link } from "react-router-dom";
import { activeNav } from "../../utils/zustand";

interface PropsType {
  icons: string;
  name: string;
  link: string;
  onClickHandler: () => void;
  mobile: string;
}

const NavBarLinks = ({
  icons,
  name,
  link,
  onClickHandler,
  mobile,
}: PropsType) => {
  const navActive = activeNav((state) => state.active);
  return (
    <Link
      onClick={onClickHandler}
      to={link}
      className={`${
        mobile === "hidden" ? "hidden" : "flex"
      } gap-5 items-center sm:flex`}
    >
      <span className="material-symbols-outlined">{icons}</span>
      <span className={`${navActive !== null ? "hidden" : "hidden lg:block"}`}>
        {name}
      </span>
    </Link>
  );
};

export default NavBarLinks;
