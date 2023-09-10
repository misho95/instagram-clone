import { userSignIn } from "../../utils/zustand";
import NotifContent from "./notif.content";

const NotifComponent = () => {
  const user = userSignIn((state) => state.user);

  return (
    <div className="left-0 fixed w-full py-12 sm:py-0 sm:absolute sm:left-custom top-0 h-screen sm:w-80 rounded-r-lg border-r-px1 border-r-gray-200 flex flex-col gap-3 z-0 sm:z-30 bg-white border-l-px1">
      <h1 className="text-xl font-bold p-5">Notification</h1>
      <div className="p-5">
        {user?.notif &&
          user?.notif.map((n) => {
            return <NotifContent key={n.id} data={n} />;
          })}
      </div>
    </div>
  );
};

export default NotifComponent;
