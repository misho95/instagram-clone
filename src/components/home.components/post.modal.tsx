import { useRef, useState, useEffect } from "react";
import { userSignIn } from "../../utils/zustand";
import { storage, addNewDataInServerStorage } from "../../utils/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import VideoPlayer from "./video.player";
import LoadingComponent from "../loading.component";
import { IconCloudUpload } from "@tabler/icons-react";

interface PropsType {
  setOpenPostModal: (arg: boolean) => void;
}

const PostModal = ({ setOpenPostModal }: PropsType) => {
  const [page, setPage] = useState(0);
  const user = userSignIn((state) => state.user);
  const fileButton = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<null | File | undefined>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [titleText, setTitleText] = useState("");

  const activeUploadButton = () => {
    if (fileButton.current) {
      fileButton.current.click();
    }
  };

  const uploadFile = async () => {
    if (file && user) {
      const sliceType = file.type.split("/");
      const getType = sliceType[0];
      setType(getType);
      if (getType === "image" || getType === "video") {
        const date = new Date().getTime();
        const storageRef = ref(
          storage,
          `/images/${user.id}/${file.name}.${date}`
        );

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
          const imgUrl = snapshot.metadata.fullPath;

          getDownloadURL(ref(storage, imgUrl))
            .then((url) => {
              // `url` is the download URL for 'images/stars.jpg'

              setImgUrl(url);
              setPage(1);
              setLoading(false);
            })
            .catch((error) => {
              // Handle any errors
              console.log(error);
            });
        });
      } else {
        setLoading(false);
        setError("Wrong Fail");
        return;
      }
    }
  };

  const publishPost = async () => {
    if (user) {
      const date = new Date();
      const ID = v4();
      const sharedId = v4();
      await addNewDataInServerStorage("posts", ID, {
        id: ID,
        userId: user.id,
        link: imgUrl,
        type,
        titleText,
        date: date.toString(),
        commentsRoomId: sharedId,
        likesId: sharedId,
        likes: [],
      });
      setFile(null);
      setPage(0);
      setOpenPostModal(false);

      await addNewDataInServerStorage("postComments", sharedId, {
        id: sharedId,
        postId: ID,
        comments: [],
      });

      await addNewDataInServerStorage("likes", sharedId, {
        id: sharedId,
        postId: ID,
        userLikes: [],
      });
    }
  };

  const cancelUpload = async () => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, imgUrl);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setFile(null);
        setPage(0);
        setOpenPostModal(false);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  useEffect(() => {
    if (file) {
      setLoading(true);
      uploadFile();
    }
  }, [file]);

  return (
    <>
      {loading && <LoadingComponent />}
      {page === 0 && (
        <div
          onClick={() => setOpenPostModal(false)}
          className="bg-black/50 fixed top-0 left-0 w-full h-screen flex items-center justify-center z-40"
        >
          <button
            onClick={() => setOpenPostModal(false)}
            className="text-white fixed top-5 right-5 text-2xl"
          >
            X
          </button>
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="bg-white p-5 rounded-lg w-2/3 sm:w-1/2 h-fit flex flex-col gap-5 justify-between"
          >
            <h1 className="text-center font-bold text-xl">Create new post</h1>
            <div className="flex flex-col gap-2">
              <div
                onClick={activeUploadButton}
                className="flex flex-col gap-2 justify-center items-center bg-black/5 rounded-lg p-2"
              >
                <IconCloudUpload size={50} color={"black"} stroke={1.5} />
                <h1 className="text-lg font-semibold">Upload File</h1>
                <p className="text-sm text-black/70 text-center">
                  We can accept only image or video files
                </p>
              </div>
              {error && (
                <div className="text-sm text-red-500 w-full text-center">
                  {error}
                </div>
              )}
              <button
                onClick={activeUploadButton}
                className="bg-blue-500 text-white p-1 rounded-lg"
              >
                Select from Computer
              </button>
            </div>
            <input
              ref={fileButton}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFile(e.target.files?.[0]);
              }}
              type="file"
              className="hidden"
            />
          </div>
        </div>
      )}
      {page === 1 && (
        <div
          onClick={() => cancelUpload()}
          className="bg-black/50 fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50"
        >
          <button
            onClick={() => cancelUpload()}
            className="text-white fixed top-5 right-5 text-2xl"
          >
            X
          </button>
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="bg-white p-5 rounded-lg w-2/3 sm:1/2 h-fit flex flex-col gap-5 justify-between"
          >
            <div className="w-full flex flex-col gap-3 justify-center items-center">
              {type === "image" && (
                <img src={imgUrl} className="w-60 h-60 object-cover" />
              )}
              {type === "video" && (
                <VideoPlayer w={"w-40"} h={"h-40"} src={imgUrl} />
              )}
              <div className="w-full flex justify-center">
                <textarea
                  className="w-80 resize-none border-px1 p-2 focus:outline-none"
                  placeholder="title text..."
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={cancelUpload}
                className="bg-red-500 p-2 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={publishPost}
                className="bg-sky-500 p-2 rounded-md text-white"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
