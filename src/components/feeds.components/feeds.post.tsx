import { useState, useEffect } from "react";
import { getDataFromServer } from "../../utils/firebase";
import {
  PostsType,
  userSignIn,
  userType,
  postCommentsType,
} from "../../utils/zustand";
import PostModal from "../profile.components/post.modal";
import { Avatar, Skeleton } from "@mui/material";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import {
  updateDataInServerArray,
  deleteDataInServerArray,
} from "../../utils/firebase";
import VideoPlayer from "../home.components/video.player";

interface PropsType {
  data: PostsType;
}

interface userLikesType {
  postId: string;
  userId: string;
}

interface likesDataType {
  id: string;
  postId: string;
  userLikes: userLikesType[];
}

const FeedsPost = ({ data }: PropsType) => {
  const currentUser = userSignIn((state) => state.user);
  const [user, setUser] = useState<userType | null>(null);
  const [openPostsModal, setOpenPostsModal] = useState(false);
  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [likesData, setLikesData] = useState<likesDataType | null>();
  const [ifUserLikes, setIfUserLikes] = useState<boolean>(false);
  const [commentsData, setCommentsData] = useState<postCommentsType>();

  const waitUserData = async () => {
    const userData = await getDataFromServer("users", data.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
    setLoading(false);
  };

  const waitLikesDataAndSetIt = async () => {
    await getRealTimeUpdateAndSetIt("likes", data.likesId, setLikesData);
  };

  const waitCommentsDataAndSetIt = async () => {
    await getRealTimeUpdateAndSetIt(
      "postComments",
      data.commentsRoomId,
      setCommentsData
    );
  };

  const checkIfUserLikes = async () => {
    if (likesData && currentUser) {
      const findUserInLikes = likesData.userLikes.find((l) => {
        if (l.userId === currentUser.id) {
          return l;
        }
      });
      if (findUserInLikes) {
        setIfUserLikes(true);
      } else {
        setIfUserLikes(false);
      }
    }
  };

  const likePost = async () => {
    if (currentUser) {
      await updateDataInServerArray("likes", data.likesId, "userLikes", {
        postId: data.id,
        userId: currentUser.id,
      });
    }
  };

  const unLikePost = async () => {
    if (currentUser) {
      await deleteDataInServerArray("likes", data.likesId, "userLikes", {
        postId: data.id,
        userId: currentUser.id,
      });
    }
  };

  useEffect(() => {
    waitUserData();
    waitLikesDataAndSetIt();
    waitCommentsDataAndSetIt();
    if (data.userId === currentUser?.id) {
      setType("owner");
    } else {
      setType("user");
    }
  }, []);

  useEffect(() => {
    checkIfUserLikes();
  }, [likesData, ifUserLikes]);

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
            <Avatar
              alt={user?.userName}
              src={user?.avatar}
              sx={{ width: 24, height: 24, fontSize: 15 }}
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
          {data.type === "image" && (
            <img
              onClick={() => setOpenPostsModal(!openPostsModal)}
              src={data.link}
              className="w-full h-60 object-cover object-center"
            />
          )}
          {data.type === "video" && (
            <div onClick={() => setOpenPostsModal(!openPostsModal)}>
              <VideoPlayer w={"w-full"} h={"h-60"} src={data.link} />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <button
              onClick={ifUserLikes ? unLikePost : likePost}
              className={`${
                ifUserLikes ? "bg-red-500 text-white" : "text-black"
              } flex w-fit h-fit p-1 rounded-full justify-center items-center relative`}
            >
              <span className="material-symbols-outlined">favorite</span>
              <span
                className={`${
                  ifUserLikes ? "bg-black text-white" : "bg-red-500 text-white"
                } absolute  rounded-full flex text-xs  w-4 h-4 justify-center items-center top-0 right-0`}
              >
                {data && likesData?.userLikes.length}
              </span>
            </button>
            <button
              onClick={() => setOpenPostsModal(!openPostsModal)}
              className="flex w-fit h-fit p-1 rounded-full justify-center items-center relative"
            >
              <span className="material-symbols-outlined">chat</span>
              <div className="absolute top-0 right-0 bg-red-500 w-4 h-4 flex justify-center items-center text-sm rounded-full text-white">
                {commentsData && commentsData.comments.length}
              </div>
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
