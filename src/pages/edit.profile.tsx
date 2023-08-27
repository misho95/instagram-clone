import LeftNavBar from "../components/home.components/leftNavBar";
import { userSignIn, activeNav } from "../utils/zustand";
import { useState, useRef, useEffect } from "react";
import { storage, changeDataInServerWidthId } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditProfile = () => {
  const user = userSignIn((state) => state.user);
  const setNavActive = activeNav((state) => state.setActive);
  const [file, setFile] = useState<null | File | undefined>(null);
  const fileButton = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");

  const activeUploadButton = () => {
    if (fileButton.current) {
      fileButton.current.click();
    }
  };

  const uploadFile = async () => {
    if (file && user) {
      const sliceType = file.type.split("/");
      const getType = sliceType[0];
      if (getType === "image") {
        const date = new Date().getTime();
        const storageRef = ref(
          storage,
          `/images/profile/${user.id}/${file.name}.${date}`
        );

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
          const imgUrl = snapshot.metadata.fullPath;

          getDownloadURL(ref(storage, imgUrl))
            .then((url) => {
              changeDataInServerWidthId("users", user.id, "avatar", url);
            })
            .catch((error) => {
              // Handle any errors
              console.log(error);
            });
        });
      }
    } else {
      setError("Wrong Fail");
      return;
    }
  };

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  return (
    <div>
      <LeftNavBar />
      <div
        onClick={() => setNavActive(null)}
        className="w-full p-0 sm:pl-pxcontentmd lg:px-pxcontent min-h-screen"
      >
        <h1 className="text-xl font-bold p-5">Settings</h1>
        <div className="p-5 border-px1 border-gray-200">
          <h1 className="text-xl font-bold">Edit profile</h1>
          <div className="p-5 flex gap-5 items-center">
            <img
              src={user?.avatar}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <span>{user?.userName}</span>
              <button onClick={activeUploadButton} className="text-sky-500">
                Change profile photo
              </button>
              <input
                ref={fileButton}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFile(e.target.files?.[0]);
                }}
                type="file"
                className="hidden"
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
