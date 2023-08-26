import { useRef } from "react";

interface PropsType {
  setOpenPostModal: (arg: boolean) => void;
}

const PostModal = ({ setOpenPostModal }: PropsType) => {
  const fileButton = useRef(null);

  const activeUploadButton = () => {
    if (fileButton.current) {
      fileButton.current.click();
    }
  };

  return (
    <div
      onClick={() => setOpenPostModal(false)}
      className="bg-black/50 fixed top-0 left-0 w-full h-screen flex items-center justify-center"
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
        className="bg-white p-5 rounded-lg w-2/3 sm:1/2 h-1/2 flex flex-col gap-5 justify-between"
      >
        <h1 className="text-center font-bold text-xl">Create new post</h1>
        <button
          onClick={activeUploadButton}
          className="bg-blue-500 text-white p-1 rounded-lg"
        >
          Select from Computer
        </button>
        <input ref={fileButton} type="file" className="hidden" />
      </div>
    </div>
  );
};

export default PostModal;
