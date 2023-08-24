import { useParams } from "react-router-dom";
import LeftNavBar from "../components/home.components/leftNavBar";

const UserProfile = () => {
  const { userId } = useParams();

  console.log(userId);

  return (
    <div className="flex min-h-screen">
      <LeftNavBar />
      <div className="pl-96">User Profile</div>
    </div>
  );
};

export default UserProfile;
