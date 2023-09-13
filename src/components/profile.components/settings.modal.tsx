import { singOutCurrentUser, updateDataInServer } from "../../utils/firebase";
import { userSignIn } from "../../utils/zustand";

interface PropsType {
  setOpenSettingsModal: (arg: boolean) => void;
}

const SettingsModal = ({ setOpenSettingsModal }: PropsType) => {
  const setUser = userSignIn((state) => state.setUser);
  const user = userSignIn((state) => state.user);

  const updateUserActiveStatus = async () => {
    if (user) {
      await updateDataInServer("users", user.id, "userActive", false);
    }
  };

  const logOutUser = () => {
    singOutCurrentUser();
    setUser(null);
    updateUserActiveStatus();
  };

  return (
    <div
      onClick={() => setOpenSettingsModal(false)}
      className="fixed bg-black/50 w-full h-screen top-0 left-0 flex justify-center items-center z-50"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className=" bg-white rounded-lg flex flex-col gap-5"
      >
        <button
          onClick={logOutUser}
          className="border-b-px1 border-gray-200 w-full p-5"
        >
          Log Out
        </button>
        <button className="p-5" onClick={() => setOpenSettingsModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
