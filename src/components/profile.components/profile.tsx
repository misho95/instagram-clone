import ProfileHeader from "./profile.header";
import { userType } from "../../utils/zustand";
import ProfilePosts from "./profile.posts";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const Profile = ({ type, data }: propsType) => {
  return (
    <div className="w-full p-0 sm:pl-pxcontentmd lg:px-pxcontent flex flex-col gap-10">
      <ProfileHeader type={type} data={data} />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
