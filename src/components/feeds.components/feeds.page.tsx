import { useState, useEffect } from "react";
import { PostsType, userSignIn } from "../../utils/zustand";
import FeedsPost from "./feeds.post";
import LoadingComponent from "../loading.component";
import { getRealTimeFeedsCollectionAndSetIt } from "../../utils/helper.script";

const FeedsPage = () => {
  const currentUser = userSignIn((state) => state.user);
  const [feed, setFeed] = useState<PostsType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const waitFeed = async () => {
    if (currentUser && currentUser?.following.length > 0) {
      await getRealTimeFeedsCollectionAndSetIt(
        "posts",
        currentUser.id,
        currentUser.following,
        setFeed
      );
    }
  };

  useEffect(() => {
    waitFeed();
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col items-center mt-5 mb-20 pb-10 sm:my-20 gap-10">
      {feed &&
        feed.map((feed: PostsType) => {
          return <FeedsPost key={feed.id} data={feed} />;
        })}
      {!feed || (feed.length === 0 && <div>No Feed Data</div>)}
    </div>
  );
};

export default FeedsPage;
