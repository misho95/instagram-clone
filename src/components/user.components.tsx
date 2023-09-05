import { Avatar } from "@mui/material";
import { userSignIn } from "../utils/zustand";
import { Link } from "react-router-dom";

const UserComponent = () => {
  const user = userSignIn((state) => state.user);

  return (
    <div className="hidden sm:flex fixed right-10 top-10 w-60 justify-between items-center">
      <Link to={`/${user?.userName}`} className="flex gap-3">
        <div>
          <Avatar
            alt={user?.userName}
            src={user?.avatar}
            sx={{ width: 40, height: 40 }}
          />
        </div>
        <div className="flex flex-col text-sm text-gray-700">
          <span>{user?.userName}</span>
          <span>{user?.fullName}</span>
        </div>
      </Link>

      <button className="text-sky-500">switch</button>
    </div>
  );
};

export default UserComponent;
