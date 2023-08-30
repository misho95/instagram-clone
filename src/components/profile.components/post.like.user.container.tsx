import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { getDataFromServer } from "../../utils/firebase";
import { userType } from "../../utils/zustand";

interface PropsType {
  id: string;
}

const PostLikeUserConatiner = ({ id }: PropsType) => {
  const [user, setUser] = useState<userType | null>(null);

  const waitUserData = async () => {
    const data = await getDataFromServer("users", id);
    const castedUser: userType = data as userType;
    setUser(castedUser);
  };

  useEffect(() => {
    waitUserData();
  }, []);

  if (!user) {
    return;
  }

  if (user) {
    return (
      <Avatar
        sx={{ width: 20, height: 20 }}
        alt={user?.userName}
        src={user?.avatar}
      />
    );
  }
};

export default PostLikeUserConatiner;
