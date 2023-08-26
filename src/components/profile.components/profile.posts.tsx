import { userType } from "../../utils/zustand";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const ProfilePosts = ({ type, data }: propsType) => {
  console.log(type);
  return (
    <div className="flex flex-wrap gap-3">
      {data &&
        data.posts.map((post) => {
          return (
            <div>
              <img src={post.img} className="w-40 h-40 object-cover" />
            </div>
          );
        })}
    </div>
  );
};

export default ProfilePosts;
