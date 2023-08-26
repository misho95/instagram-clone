import { userType } from "../../utils/zustand";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const ProfileHeader = ({ type, data }: propsType) => {
  return (
    <div className="flex w-full items-center justify-center gap-10 pt-10">
      <div>
        <img
          src={data?.avatar}
          className="w-40 h-40 rounded-full object-cover"
        />
      </div>
      <div>
        <div className="flex gap-5 p-5 items-center">
          <span>{data?.userName}</span>
          <span>
            {type === "user" ? (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                follow
              </button>
            ) : (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                Edit Profile
              </button>
            )}
          </span>
          <span>
            {type === "user" ? (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                Message
              </button>
            ) : (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2">
                View Archive
              </button>
            )}
          </span>
          <span>
            {type === "user" ? (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            ) : (
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex">
                <span className="material-symbols-outlined">settings</span>
              </button>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>35 posts</span>
          <span>75 followers</span>
          <span>89 following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
