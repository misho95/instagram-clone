import { PostsType, userType } from "../../utils/zustand";
import Posts from "./posts";
import { useEffect, useState } from "react";
import { getRealTimePostsCollectionWithUserId } from "../../utils/helper.script";
import LoadingComponent from "../loading.component";

interface propsType {
  data: userType | undefined | null;
  type: string;
}

const ProfilePosts = ({ data, type }: propsType) => {
  const [userPosts, setUserPosts] = useState<PostsType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const waitUserPosts = async () => {
    if (data) {
      await getRealTimePostsCollectionWithUserId(
        "posts",
        data.id,
        setUserPosts
      ).then(() => setLoading(false));
    }
  };

  useEffect(() => {
    waitUserPosts();
  }, [data]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full h-fit flex justify-center">
      <div className="flex flex-wrap gap-3 relative w-postContainer sm:w-10/12 md:w-full">
        {userPosts &&
          userPosts.map((post) => {
            return <Posts key={post.id} post={post} type={type} />;
          })}
      </div>
    </div>
  );
};

export default ProfilePosts;
