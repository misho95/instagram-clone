import { PostsType, userType } from "../../utils/zustand";
import {
  getDataFromServer,
  deleteDataInServerArray,
} from "../../utils/firebase";
import VideoPlayer from "../home.components/video.player";
import { useState, useEffect } from "react";

interface PropsType {
  post: PostsType;
  setOpenPostsModal: (arg: boolean) => void;
}

const PostModal = ({ post, setOpenPostsModal }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();
  const [showPostSettings, setShowPostSettings] = useState<boolean>(false);

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
        className="w-4/5 md:w-3/5 lg:w-1/2 bg-white flex flex-col md:flex-row rounded-b-md lg:rounded-r-md "
      >
        <div className="w-full lg:w-2/3">
          {post.type === "image" && <img src={post.link} />}
          {post.type === "video" && (
            <VideoPlayer w={"w-full"} h={"h-full"} src={post.link} />
          )}
        </div>
        <div className="w-full lg:w-1/2">
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
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-500"
                  >
                    Delete Post
                  </button>
                  <button onClick={() => setShowPostSettings(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
