import { notifType } from "../../utils/zustand";

interface PropsType {
  data: notifType;
}

const NotifContent = ({ data }: PropsType) => {
  return (
    <div className="flex gap-3">
      <span>{data.title}</span>
      <span></span>
      <button className="bg-sky-500 text-white p-2 rounded-lg">Follow</button>
    </div>
  );
};

export default NotifContent;
