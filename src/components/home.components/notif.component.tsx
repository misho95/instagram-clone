import { userSignIn } from "../../utils/zustand";
import NotifContent from "./notif.content";

const NotifComponent = () => {
  const user = userSignIn((state) => state.user);

  return (
    <div className="absolute left-custom top-0 h-screen w-80 rounded-r-lg border-r-px1 border-r-gray-200 hidden sm:flex flex-col gap-3 z-40 bg-white">
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
