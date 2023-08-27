import { userType } from "../../utils/zustand";
import VideoPlayer from "../home.components/video.player";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const ProfilePosts = ({ type, data }: propsType) => {
  console.log(type);
  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-normal">
      {data?.posts &&
        data.posts.map((post) => {
          return (
            <div key={post.id}>
              {post.type === "image" && (
                <img src={post.link} className="w-40 h-40 object-cover" />
              )}
              {post.type === "video" && <VideoPlayer src={post.link} />}
            </div>
          );
        })}
    </div>
  );
};

export default ProfilePosts;
