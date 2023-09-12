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
  deleteDataInServer,
} from "../../utils/firebase";
import {
  getRealTimeUpdateAndSetIt,
  deleteImgInStorage,
} from "../../utils/helper.script";
import VideoPlayer from "../home.components/video.player";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { v4 } from "uuid";
import PostComment from "./post.comment";
import { Avatar, AvatarGroup } from "@mui/material";
import PostLikeUserConatiner from "./post.like.user.container";
import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { Emoji } from "emoji-picker-react";

interface PropsType {
  post: PostsType;
  type: string;
  setOpenPostsModal: (arg: boolean) => void;
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

const PostModal = ({ post, setOpenPostsModal, type }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();
  const [showPostSettings, setShowPostSettings] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<postCommentsType | null>(null);
  const currentUser = userSignIn((state) => state.user);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [ifUserLikes, setIfUserLikes] = useState(false);
  const [likesData, setLikesData] = useState<likesDataType | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const waitFetch = async () => {
    const userData = await getDataFromServer("users", post.userId);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  const deletePost = async () => {
    if (user) {
      await deleteDataInServer("posts", post.id);
      await deleteDataInServer("likes", post.likesId);
      await deleteDataInServer("postComments", post.commentsRoomId);
      await deleteImgInStorage(post.link);
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
      setShowEmoji(false);
    }
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

  const waitLikesDataAndSetIt = async () => {
    await getRealTimeUpdateAndSetIt("likes", post.likesId, setLikesData);
  };

  const likePost = async () => {
    if (currentUser) {
      await updateDataInServerArray("likes", post.likesId, "userLikes", {
        postId: post.id,
        userId: currentUser.id,
      });
    }
  };

  const unLikePost = async () => {
    if (currentUser) {
      await deleteDataInServerArray("likes", post.likesId, "userLikes", {
        postId: post.id,
        userId: currentUser.id,
      });
    }
  };

  const scrollToBottom = () => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  };

  const handleEmoji = (emojiObj: any) => {
    setCommentText(commentText + emojiObj.emoji);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (commentText !== "") {
        submitNewComment();
      }
    }
  };

  useEffect(() => {
    waitFetch();
    getCommentsByPostId();
    waitLikesDataAndSetIt();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  useEffect(() => {
    checkIfUserLikes();
  }, [likesData, ifUserLikes]);

  return (
    <div
      onClick={() => setOpenPostsModal(false)}
      className="w-full min-h-screen fixed top-0 left-0 bg-black/50 z-50 flex justify-center items-start sm:items-center py-3 overflow-y-auto"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="w-4/5 md:w-3/5 lg:w-1/2 bg-white flex flex-col md:flex-row rounded-b-md lg:rounded-r-md h-fit sm:h-4/5 "
      >
        <div className="w-full lg:w-2/3 flex justify-center items-center p-3 h-full">
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            {post.type === "image" && (
              <img
                src={post.link}
                className="w-full sm:w-11/12 h-60 sm:h-full sm:max-h-full object-cover"
              />
            )}
            {post.type === "video" && (
              <VideoPlayer w={"w-full"} h={"h-full"} src={post.link} />
            )}
            {post.titleText && (
              <span className="text-left w-full px-3">{post.titleText}</span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-96 sm:h-full flex flex-col sm:justify-between sm:border-l-px1 border-gray-200 ">
          <div className="flex items-center justify-between border-t-px1 lg:border-t-0 lg:border-b-px1 border-gray-200 p-5 relative">
            <Link
              to={`/${user?.userName}`}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Avatar
                alt={user?.userName}
                src={user?.avatar}
                sx={{ width: 28, height: 28 }}
              />
              <span> {user?.userName}</span>
            </Link>
            <button onClick={() => setShowPostSettings(!showPostSettings)}>
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
            {showPostSettings && (
              <div
                onClick={() => setShowPostSettings(false)}
                className="fixed left-0 top-0 w-full h-screen bg-black/50 flex justify-center items-center z-50"
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
          <div className="w-full h-80 sm:h-full flex flex-col justify-between overflow-y-auto">
            <div
              className="h-full md:h-postComment lg:h-mobile overflow-y-auto"
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
                      return (
                        <PostComment key={com.id} postId={post.id} data={com} />
                      );
                    })}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 relative">
              <div className="w-full p-2">
                <AvatarGroup
                  sx={{
                    width: 200,
                    justifyContent: "start",
                    "& .MuiAvatar-root": {
                      width: 30,
                      height: 30,
                      fontSize: 12,
                    },
                  }}
                  max={3}
                  total={likesData ? likesData.userLikes.length : 0}
                >
                  {likesData &&
                    likesData.userLikes.map((user) => {
                      return (
                        <PostLikeUserConatiner
                          key={user.userId}
                          id={user.userId}
                        />
                      );
                    })}
                </AvatarGroup>
              </div>
              <div className="flex gap-3 items-center p-2 h-fit w-full">
                <button
                  onClick={ifUserLikes ? unLikePost : likePost}
                  className={`${
                    ifUserLikes ? "bg-red-500 text-white" : "text-black"
                  } flex w-fit h-fit p-1 rounded-full justify-center items-center relative`}
                >
                  <span className="material-symbols-outlined">favorite</span>
                  <span
                    className={`${
                      ifUserLikes
                        ? "bg-black text-white"
                        : "bg-red-500 text-white"
                    } absolute  rounded-full flex text-xs  w-4 h-4 justify-center items-center top-0 right-0`}
                  >
                    {post && likesData?.userLikes.length}
                  </span>
                </button>
                <button className="flex w-fit h-fit p-1 rounded-full justify-center items-center">
                  <span className="material-symbols-outlined">comment</span>
                </button>
                <button className="flex w-fit h-fit p-1 rounded-full justify-center items-center">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>

              <div className="relative w-full h-fit border-t-px1 border-gray-200 p-2 z-30">
                <textarea
                  onKeyDown={handleKeyPress}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full h-10 focus:outline-none resize-none pr-24"
                />

                <div className="absolute right-10 top-1/2 -translate-y-1/2 sm:top-3 sm:-translate-y-0 z-40 flex gap-3">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="hidden sm:flex"
                  >
                    <Emoji unified="1f603" size={25} />
                  </button>
                  <button
                    onClick={submitNewComment}
                    disabled={commentText === "" ? true : false}
                    className={`${
                      commentText === "" ? "text-sky-100" : "text-sky-500"
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
              {showEmoji && (
                <div className="absolute bottom-20 right-5 hidden sm:flex">
                  <EmojiPicker onEmojiClick={(e) => handleEmoji(e)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
