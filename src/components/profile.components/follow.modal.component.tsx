import FollowUser from "./follow.user";
import { userType } from "../../utils/zustand";

interface PropsType {
  data: userType | null | undefined;
  type: string;
  set: (arg: boolean) => void;
}

const FollowModalComponent = ({ data, type, set }: PropsType) => {
  return (
    <div
      onClick={() => set(false)}
      className="bg-black/50 fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="bg-white p-5 rounded-lg flex flex-col gap-4 w-60"
      >
        <h1 className="font-bold text-center">
          {type === "followings" ? "Followers" : "Following"}
        </h1>
        {type === "followers" && (
          <>
            {data?.followers.map((data) => {
              return <FollowUser key={data.id} data={data} />;
            })}
          </>
        )}
        {type === "followings" && (
          <>
            {data?.following.map((data) => {
              return <FollowUser key={data.id} data={data} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowModalComponent;
