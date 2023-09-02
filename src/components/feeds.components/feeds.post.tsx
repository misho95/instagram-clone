import { useState, useEffect } from "react";
import { getDataFromServer } from "../../utils/firebase";
import { PostsType, userSignIn, userType } from "../../utils/zustand";
import PostModal from "../profile.components/post.modal";
import { Skeleton } from "@mui/material";

interface PropsType {
  data: PostsType;
}

const FeedsPost = ({ data }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [user, setUser] = useState<userType | null>(null);
  const [openPostsModal, setOpenPostsModal] = useState(false);
  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const waitUserData = async () => {
    const userData = await getDataFromServer("users", data.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
    setLoading(false);
  };

  useEffect(() => {
    waitUserData();
    if (data.userId === currentUser?.id) {
      setType("owner");
    } else {
      setType("user");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: 300 }} />
        </div>
        <Skeleton variant="rounded" width={353} height={140} />
      </div>
    );
  }

  return (
    <>
      {openPostsModal && (
        <PostModal
          post={data}
          setOpenPostsModal={setOpenPostsModal}
          type={type}
        />
      )}
      <div className="flex flex-col w-80 sm:w-96 gap-5">
        <div className="w-full flex justify-between">
          <div className="flex gap-3 items-center">
            <img
              src={user?.avatar}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{user?.userName}</span>
          </div>
          <div>
            <button>
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
        <div>
          <img
            onClick={() => setOpenPostsModal(!openPostsModal)}
            src={data.link}
            className="w-full h-60 object-cover object-center"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <button>
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button>
              <span className="material-symbols-outlined">chat</span>
            </button>
            <button>
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <button>
            <span className="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedsPost;
