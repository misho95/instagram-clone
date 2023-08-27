import { getDataFromServer } from "../../utils/firebase";
import { useState, useEffect } from "react";
import { userType, followersType } from "../../utils/zustand";

interface PropsType {
  data: followersType;
}

const FollowUser = ({ data }: PropsType) => {
  const [user, setUser] = useState<userType | undefined>();

  const waitFetcher = async () => {
    const userData = await getDataFromServer("users", data.id);
    const castedUser: userType = userData as userType;
    setUser(castedUser);
  };

  useEffect(() => {
    waitFetcher();
  }, []);

  return (
    <div className="flex gap-3">
      <img src={user?.avatar} className="w-8 h-8 rounded-full object-cover" />
      {user?.userName}
    </div>
  );
};

export default FollowUser;
