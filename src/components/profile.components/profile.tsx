import ProfileHeader from "./profile.header";
import { userType, activeNav } from "../../utils/zustand";
import ProfilePosts from "./profile.posts";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const Profile = ({ type, data }: propsType) => {
  const setNavActive = activeNav((state) => state.setActive);
  return (
    <div
      onClick={() => setNavActive(null)}
      className="w-full p-0 sm:pl-pxcontentmd lg:px-pxcontent flex flex-col gap-10"
    >
      <ProfileHeader type={type} data={data} />
      <ProfilePosts type={type} data={data} />
    </div>
  );
};

export default Profile;
