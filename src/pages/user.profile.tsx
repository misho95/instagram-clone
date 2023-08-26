import { useParams } from "react-router-dom";
import LeftNavBar from "../components/home.components/leftNavBar";
import { useState, useEffect } from "react";
import { userSignIn } from "../utils/zustand";

const UserProfile = () => {
  const { userId } = useParams();

  const user = userSignIn((state) => state.user);
  const [type, setType] = useState("user");
  const [loading, setLoading] = useState(true);

  console.log(userId);

  useEffect(() => {
    if (userId === user?.userName) {
      setType("owner");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return;
  }

  return (
    <div className="flex min-h-screen">
      <LeftNavBar />
      <div className="md:pl-20 lg:pl-96">
        {type === "user" ? (
          <button>follow</button>
        ) : (
          <button>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
