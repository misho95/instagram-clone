import { userType } from "../../utils/zustand";
import Posts from "./posts";

interface propsType {
  data: userType | undefined | null;
  type: string;
}

const ProfilePosts = ({ data, type }: propsType) => {
  return (
    <div className="w-full h-fit flex justify-center">
      <div className="flex flex-wrap gap-3 relative w-postContainer sm:w-10/12 md:w-full">
        {data?.posts &&
          data.posts.map((post) => {
            return <Posts key={post.id} post={post} type={type} />;
          })}
      </div>
    </div>
  );
};

export default ProfilePosts;
