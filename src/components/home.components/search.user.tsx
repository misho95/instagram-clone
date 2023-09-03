import { Link } from "react-router-dom";
import { userType } from "../../utils/zustand";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Avatar } from "@mui/material";

interface PropsType {
  user: userType;
  set: any;
}

const SearchUser = ({ user, set }: PropsType) => {
  const [avatarLoading, setAvatarLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAvatarLoading(false);
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
        <Avatar
          alt={user?.userName}
          src={user?.avatar}
          sx={{ width: 24, height: 24 }}
        />
      )}
      {user.userName}
    </Link>
  );
};

export default SearchUser;
