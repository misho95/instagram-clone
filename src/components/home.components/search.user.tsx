import { Link } from "react-router-dom";
import { userType } from "../../utils/zustand";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

interface PropsType {
  user: userType;
  set: any;
}

const SearchUser = ({ user, set }: PropsType) => {
  const [avatarLoading, setAvatarLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const img = new Image();
      img.src = user.avatar;
      img.onload = () => {
        setAvatarLoading(false);
      };
    }
  }, []);

  return (
    <Link
      key={user.id}
      to={`/${user.userName}`}
      onClick={() => set(null)}
      className="p-2 flex items-center gap-3 hover:bg-gray-200/70 rounded-md"
    >
      {avatarLoading && <Skeleton variant="circular" width={24} height={24} />}
      {!avatarLoading && (
        <img
          src={user.avatar}
          alt={user.userName}
          className="w-6 h-6 rounded-full object-cover"
        />
      )}
      {user.userName}
    </Link>
  );
};

export default SearchUser;
