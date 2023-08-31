import { useState, useEffect } from "react";
import { PostsType, userSignIn } from "../../utils/zustand";
import { getFeedData } from "../../utils/firebase";
import FeedsPost from "./feeds.post";

const FeedsPage = () => {
  const currentUser = userSignIn((state) => state.user);
  const [feed, setFeed] = useState<PostsType[] | null>(null);

  const waitFeed = async () => {
    if (currentUser) {
      await getFeedData(currentUser.id, setFeed);
    }
  };

  useEffect(() => {
    waitFeed();
  }, []);

  // if (feed) {
  //   const sortData = feed.sort((a, b) => {
  //     return Date.parse(b.date) - Date.parse(a.date);
  //   });
  //   setFeed(sortData);
  // }

  return (
    <div className="flex flex-col items-center mt-5 mb-20 sm:my-20 gap-10">
      {feed &&
        feed?.map((feed: PostsType) => {
          return <FeedsPost key={feed.id} data={feed} />;
        })}
      {!feed && <div>No Feed Data</div>}
    </div>
  );
};

export default FeedsPage;
