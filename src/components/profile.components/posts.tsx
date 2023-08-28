import VideoPlayer from "../home.components/video.player";

import { PostsType } from "../../utils/zustand";
import { useState, useEffect } from "react";
import PostModal from "./post.modal";
import Skeleton from "@mui/material/Skeleton";

interface PropsType {
  post: PostsType;
  type: string;
}

const Posts = ({ post, type }: PropsType) => {
  const [openPostsModal, setOpenPostsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (post) {
      const img = new Image();
      img.src = post.link;
      img.onload = () => {
        setLoading(false);
      };
    }
  }, [post]);

  return (
    <>
      {openPostsModal && (
        <PostModal
          post={post}
          setOpenPostsModal={setOpenPostsModal}
          type={type}
        />
      )}
      {loading && (
        <div>
          <Skeleton variant="rounded" width={160} height={160} />
        </div>
      )}
      {!loading && (
        <div onClick={() => setOpenPostsModal(!openPostsModal)} key={post.id}>
          {post.type === "image" && (
            <img src={post.link} className="w-40 h-40 object-cover" />
          )}
          {post.type === "video" && (
            <VideoPlayer w={"w-40"} h={"h-40"} src={post.link} />
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
