import ProfileHeader from "./profile.header";
import { userType } from "../../utils/zustand";

interface propsType {
  type: string;
  data: userType | undefined | null;
}

const Profile = ({ type, data }: propsType) => {
  return (
    <div className="md:px-20 lg:px-96 w-full">
      <ProfileHeader type={type} data={data} />
    </div>
  );
};

export default Profile;
