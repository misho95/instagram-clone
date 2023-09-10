import { useState, useEffect } from "react";
import {
  getDataFromServer,
  deleteDataInServerArray,
  getPostCommentsIdWIthPostId,
} from "../../utils/firebase";
import {
  postCommentsTypeComment,
  userSignIn,
  userType,
} from "../../utils/zustand";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface PropsType {
  data: postCommentsTypeComment;
  postId: string;
}

const PostComment = ({ data, postId }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [user, setUser] = useState<userType | null>(null);

  const waitUserDataAndSetIt = async () => {
    const userData = await getDataFromServer("users", data.user);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  const deleteComment = async () => {
    const postCommentData = await getPostCommentsIdWIthPostId(postId);
    if (postCommentData) {
      await deleteDataInServerArray(
        "postComments",
        postCommentData[0].id,
        "comments",
        data
      );
    }
  };

  useEffect(() => {
    waitUserDataAndSetIt();
  }, []);

  return (
    <div className="w-full relative">
      {data.user === currentUser?.id && (
        <button
          onClick={deleteComment}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
        </button>
      )}
      <Link to={`/${user?.userName}`} className="flex gap-3 items-center w-fit">
        <Avatar
          alt={user?.userName}
          src={user?.avatar}
          sx={{ width: 24, height: 24 }}
        />
        <span className="text-sm">{user?.userName}</span>
      </Link>
      <div className="p-3">{data.comment}</div>
    </div>
  );
};
export default PostComment;
