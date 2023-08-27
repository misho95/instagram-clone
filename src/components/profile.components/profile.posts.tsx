import { userType } from "../../utils/zustand";
import Posts from "./posts";

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
          return <Posts key={post.id} post={post} />;
        })}
    </div>
  );
};

export default ProfilePosts;
