import { userType } from "../../utils/zustand";
import Posts from "./posts";

interface propsType {
  data: userType | undefined | null;
}

const ProfilePosts = ({ data }: propsType) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-normal relative">
      {data?.posts &&
        data.posts.map((post) => {
          return <Posts key={post.id} post={post} />;
        })}
    </div>
  );
};

export default ProfilePosts;
