import { useParams } from "react-router-dom";
import LeftNavBar from "../components/home.components/leftNavBar";
import { useState, useEffect } from "react";
import { userSignIn } from "../utils/zustand";
import { getDataFromServerByUserName } from "../utils/firebase";
import Profile from "../components/profile.components/profile";
import { userType } from "../utils/zustand";
import { getRealTimeUpdateAndSetIt } from "../utils/helper.script";

const UserProfile = () => {
  const { userId } = useParams();

  const user = userSignIn((state) => state.user);
  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [dataToSend, setDataToSend] = useState<userType | undefined | null>();

  const getDataFromServerANdSetIt = async () => {
    const data = await getDataFromServerByUserName("users", userId);
    if (data) {
      await getRealTimeUpdateAndSetIt("users", data[0].id, setDataToSend);
    }
  };

  useEffect(() => {
    if (userId === user?.userName) {
      setType("owner");
      setLoading(false);
      setDataToSend(user);
    } else {
      setType("user");
      setLoading(false);
      getDataFromServerANdSetIt();
    }
  }, [userId, user, dataToSend]);

  if (loading) {
    return;
  }

  return (
    <div className="flex min-h-screen ">
      <LeftNavBar />
      <Profile type={type} data={dataToSend} />
    </div>
  );
};

export default UserProfile;
