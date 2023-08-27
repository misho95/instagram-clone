import { Link } from "react-router-dom";
import { activeNav } from "../../utils/zustand";

interface PropsType {
  icons: string;
  name: string;
  link: string;
  onClickHandler: () => void;
  mobile: string;
  notif: number | null;
}

const NavBarLinks = ({
  icons,
  name,
  link,
  onClickHandler,
  mobile,
  notif,
}: PropsType) => {
  const navActive = activeNav((state) => state.active);
  return (
    <div className="w-fit h-fit relative">
      {notif !== 0 && (
        <div className="bg-red-500 absolute -left-1 -top-1 rounded-full hidden sm:flex items-center justify-center w-4 h-4 text-xs text-white ">
          {notif}
        </div>
      )}
      <Link
        onClick={onClickHandler}
        to={link}
        className={`${
          mobile === "hidden" ? "hidden" : "flex"
        } gap-5 items-center sm:flex`}
      >
        <span className="material-symbols-outlined">{icons}</span>
        <span
          className={`${navActive !== null ? "hidden" : "hidden lg:block"}`}
        >
          {name}
        </span>
      </Link>
    </div>
  );
};

export default NavBarLinks;
