import { useState, useEffect } from "react";
import { getDataFromServer } from "../../utils/firebase";
import { PostsType, userSignIn, userType } from "../../utils/zustand";
import PostModal from "../profile.components/post.modal";

interface PropsType {
  data: PostsType;
}

const FeedsPost = ({ data }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [user, setUser] = useState<userType | null>(null);
  const [openPostsModal, setOpenPostsModal] = useState(false);
  const [type, setType] = useState<string>("");

  const waitUserData = async () => {
    const userData = await getDataFromServer("users", data.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  useEffect(() => {
    waitUserData();
    if (data.userId === currentUser?.id) {
      setType("owner");
    } else {
      setType("user");
    }
  }, []);

  return (
    <>
      {openPostsModal && (
        <PostModal
          post={data}
          setOpenPostsModal={setOpenPostsModal}
          type={type}
        />
      )}
      <div className="flex flex-col w-96 gap-5">
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
