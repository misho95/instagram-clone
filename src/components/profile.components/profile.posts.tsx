import { userType } from "../../utils/zustand";
import Posts from "./posts";

interface propsType {
  data: userType | undefined | null;
}

const ProfilePosts = ({ data }: propsType) => {
  return (
    <div className="w-full h-fit flex justify-center">
      <div className="flex flex-wrap gap-3 relative w-postContainer sm:w-10/12 md:w-full">
        {data?.posts &&
          data.posts.map((post) => {
            return <Posts key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default ProfilePosts;
