import VideoPlayer from "../home.components/video.player";

import { PostsType } from "../../utils/zustand";
import { useState } from "react";
import PostModal from "./post.modal";

interface PropsType {
  post: PostsType;
}

const Posts = ({ post }: PropsType) => {
  const [openPostsModal, setOpenPostsModal] = useState<boolean>(false);
  return (
    <>
      {openPostsModal && (
        <PostModal post={post} setOpenPostsModal={setOpenPostsModal} />
      )}
      <div onClick={() => setOpenPostsModal(!openPostsModal)} key={post.id}>
        {post.type === "image" && (
          <img src={post.link} className="w-40 h-40 object-cover" />
        )}
        {post.type === "video" && (
          <VideoPlayer w={"w-40"} h={"h-40"} src={post.link} />
        )}
      </div>
    </>
  );
};

export default Posts;
