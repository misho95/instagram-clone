import { PostsType, userType } from "../../utils/zustand";
import { getDataFromServer } from "../../utils/firebase";
import VideoPlayer from "../home.components/video.player";
import { useState, useEffect } from "react";

interface PropsType {
  post: PostsType;
  setOpenPostsModal: (arg: boolean) => void;
}

const PostModal = ({ post, setOpenPostsModal }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();

  const waitFetch = async () => {
    const userData = await getDataFromServer("users", post.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
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
        className="w-1/2 bg-white flex rounded-r-md "
      >
        <div className="w-2/3">
          {post.type === "image" && <img src={post.link} />}
          {post.type === "video" && (
            <VideoPlayer w={"w-full"} h={"h-full"} src={post.link} />
          )}
        </div>
        <div className="w-1/2">
          <div className="flex items-center justify-between border-b-px1 border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span> {user?.userName}</span>
            </div>
            <button>
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
