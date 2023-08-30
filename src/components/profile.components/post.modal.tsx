import {
  PostsType,
  userType,
  postCommentsType,
  userSignIn,
} from "../../utils/zustand";
import {
  getDataFromServer,
  deleteDataInServerArray,
  updateDataInServerArray,
  postAddUserLike,
  postRemoveUserLike,
} from "../../utils/firebase";
import { getRealTimeUpdateAndSetIt } from "../../utils/helper.script";
import VideoPlayer from "../home.components/video.player";
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import PostComment from "./post.comment";

interface PropsType {
  post: PostsType;
  type: string;
  setOpenPostsModal: (arg: boolean) => void;
}

const PostModal = ({ post, setOpenPostsModal, type }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();
  const [showPostSettings, setShowPostSettings] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<postCommentsType | null>(null);
  const currentUser = userSignIn((state) => state.user);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [ifUserLikes, setIfUserLikes] = useState(false);

  const waitFetch = async () => {
    const userData = await getDataFromServer("users", post.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  const deletePost = async () => {
    if (user) {
      await deleteDataInServerArray("users", user?.id, "posts", post);
      setOpenPostsModal(false);
    }
  };

  const getCommentsByPostId = async () => {
    await getRealTimeUpdateAndSetIt(
      "postComments",
      post.commentsRoomId,
      setComments
    );
  };

  const submitNewComment = async () => {
    if (currentUser) {
      await updateDataInServerArray(
        "postComments",
        post.commentsRoomId,
        "comments",
        { id: v4(), user: currentUser.id, comment: commentText }
      );
      setCommentText("");
    }
  };

  const checkIfUserLikes = () => {
    if (post.likes && currentUser) {
      const findUserInLikes = post.likes.find((l) => {
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
      await postAddUserLike(post.userId, post.id, {
        id: v4(),
        userId: currentUser.id,
      });
    }
  };

  const unLikePost = async () => {
    if (currentUser) {
      await postRemoveUserLike(post.userId, post.id, currentUser.id);
    }
  };

  const scrollToBottom = () => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  };

  useEffect(() => {
    waitFetch();
    getCommentsByPostId();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  useEffect(() => {
    checkIfUserLikes();
  }, [post, currentUser, ifUserLikes]);

  return (
    <div
      onClick={() => setOpenPostsModal(false)}
      className="w-full h-screen fixed top-0 left-0 bg-black/50 z-50 flex justify-center items-center p-3"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="w-4/5 md:w-3/5 lg:w-1/2 bg-white flex flex-col md:flex-row rounded-b-md lg:rounded-r-md h-11/12 sm:h-4/5"
      >
        <div className="w-full lg:w-2/3 flex justify-center items-center p-3 sm:h-full">
          {post.type === "image" && (
            <img src={post.link} className="w-full sm:w-fit sm:max-h-full" />
          )}
          {post.type === "video" && (
            <VideoPlayer w={"w-full"} h={"h-full"} src={post.link} />
          )}
        </div>
        <div className="w-full lg:w-1/2 sm:h-full flex flex-col justify-between border-l-px1 border-gray-200">
          <div className="flex items-center justify-between border-t-px1 lg:border-t-0 lg:border-b-px1 border-gray-200 p-5 relative">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span> {user?.userName}</span>
            </div>
            <button onClick={() => setShowPostSettings(!showPostSettings)}>
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
            {showPostSettings && (
              <div
                onClick={() => setShowPostSettings(false)}
                className="fixed left-0 top-0 w-full h-screen bg-black/50 flex justify-center items-center"
              >
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="bg-white p-5 flex flex-col gap-3 rounded-md"
                >
                  {type === "owner" && (
                    <button onClick={deletePost} className="text-red-500">
                      Delete Post
                    </button>
                  )}
                  <button onClick={() => setShowPostSettings(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full h-80 sm:h-full flex flex-col justify-between">
            <div
              className="h-full sm:h-postComment overflow-y-auto"
              ref={chatContainer}
            >
              {comments && !comments.comments && (
                <div className="flex justify-center items-center h-full">
                  <span>
                    <h1 className="text-xl font-bold">No comments yet.</h1>
                    <p>Start the conversation.</p>
                  </span>
                </div>
              )}
              {comments && comments.comments && (
                <div className="flex flex-col gap-3 w-full p-2">
                  {comments &&
                    comments.comments.map((com) => {
                      return <PostComment key={com.id} data={com} />;
                    })}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex gap-3 items-center p-2 h-fit w-full">
                <button
                  onClick={ifUserLikes ? unLikePost : likePost}
                  className={`${
                    ifUserLikes ? "bg-red-500 text-white" : "text-black"
                  } flex w-fit h-fit p-1 rounded-full justify-center items-center `}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="flex w-fit h-fit p-1 rounded-full justify-center items-center">
                  <span className="material-symbols-outlined">chat</span>
                </button>
                <button className="flex w-fit h-fit p-1 rounded-full justify-center items-center">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
              <div className="relative w-full h-fit border-t-px1 border-gray-200 p-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full h-10 focus:outline-none resize-none pr-16"
                />
                <button
                  onClick={submitNewComment}
                  disabled={commentText === "" ? true : false}
                  className={`${
                    commentText === "" ? "text-sky-100" : "text-sky-500"
                  } absolute right-10 top-1/2 -translate-y-1/2 sm:top-3 sm:-translate-y-0`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
