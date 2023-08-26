import ProfileHeader from "./profile.header";
import { userType } from "../../utils/zustand";
import ProfilePosts from "./profile.posts";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const Profile = ({ type, data }: propsType) => {
  return (
    <div className="md:px-20 lg:px-pxcontent w-full">
      <ProfileHeader type={type} data={data} />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
