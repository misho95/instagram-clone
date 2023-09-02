import { useState, useEffect } from "react";
import { getDataFromServer } from "../../utils/firebase";
import { postCommentsTypeComment, userType } from "../../utils/zustand";
import { Avatar } from "@mui/material";

interface PropsType {
  data: postCommentsTypeComment;
}

const PostComment = ({ data }: PropsType) => {
  const [user, setUser] = useState<userType | null>(null);

  const waitUserDataAndSetIt = async () => {
    const userData = await getDataFromServer("users", data.user);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  useEffect(() => {
    waitUserDataAndSetIt();
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center">
        <Avatar
          alt={user?.userName}
          src={user?.avatar}
          sx={{ width: 24, height: 24 }}
        />
        <span className="text-sm">{user?.userName}</span>
      </div>
      <div className="p-3">{data.comment}</div>
    </div>
  );
};
export default PostComment;
