import { PostsType, userType } from "../../utils/zustand";
import {
  getDataFromServer,
  deleteDataInServerArray,
} from "../../utils/firebase";
import VideoPlayer from "../home.components/video.player";
import { useState, useEffect } from "react";

interface PropsType {
  post: PostsType;
  type: string;
  setOpenPostsModal: (arg: boolean) => void;
}

const PostModal = ({ post, setOpenPostsModal, type }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();
  const [showPostSettings, setShowPostSettings] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const waitFetch = async () => {
    const userData = await getDataFromServer("users", post.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  const deletePost = async () => {
    if (user) {
      await deleteDataInServerArray("users", user?.id, "posts", post);
      setOpenPostsModal(false);
    }
  };

  useEffect(() => {
    waitFetch();
  }, []);

  return (
    <div
      onClick={() => setOpenPostsModal(false)}
      className="w-full h-screen fixed top-0 left-0 bg-black/50 z-50 flex justify-center items-center"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="w-4/5 md:w-3/5 lg:w-1/2 bg-white flex flex-col md:flex-row rounded-b-md lg:rounded-r-md h-4/5"
      >
        <div className="w-full lg:w-2/3 flex justify-center items-center p-3 h-full">
          {post.type === "image" && (
            <img src={post.link} className="max-h-full" />
          )}
          {post.type === "video" && (
            <VideoPlayer w={"w-full"} h={"h-full"} src={post.link} />
          )}
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-between border-l-px1 border-gray-200">
          <div className="flex items-center justify-between border-t-px1 lg:border-t-0 lg:border-b-px1 border-gray-200 p-5 relative">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span> {user?.userName}</span>
            </div>
            <button onClick={() => setShowPostSettings(!showPostSettings)}>
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
            {showPostSettings && (
              <div
                onClick={() => setShowPostSettings(false)}
                className="fixed left-0 top-0 w-full h-screen bg-black/50 flex justify-center items-center"
              >
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="bg-white p-5 flex flex-col gap-3 rounded-md"
                >
                  {type === "owner" && (
                    <button onClick={deletePost} className="text-red-500">
                      Delete Post
                    </button>
                  )}
                  <button onClick={() => setShowPostSettings(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="h-full  flex flex-col justify-between">
            <div className="h-full">
              {!post?.comments && (
                <div className="flex justify-center items-center h-full">
                  <span>
                    <h1 className="text-xl font-bold">No comments yet.</h1>
                    <p>Start the conversation.</p>
                  </span>
                </div>
              )}
              {post?.comments && (
                <div className="flex flex-col gap-3 w-full p-2">
                  {post?.comments.map((com) => {
                    return <div className="w-full">{com.comment}</div>;
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center p-2 h-fit w-full">
                <button className="bg-red-500 flex w-fit h-fit p-1 rounded-full justify-center items-center text-white">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="flex w-fit h-fit p-1 rounded-full justify-center items-center">
                  <span className="material-symbols-outlined">chat</span>
                </button>
                <button className="flex w-fit h-fit p-1 rounded-full justify-center items-center">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
              <div className="relative w-full h-fit border-t-px1 border-gray-200 p-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full h-10 focus:outline-none resize-none pr-16"
                />
                <button
                  disabled={commentText === "" ? true : false}
                  className={`${
                    commentText === "" ? "text-sky-100" : "text-sky-500"
                  } absolute right-10`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
