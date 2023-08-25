import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";

import { checkUserState } from "./utils/helper.script";

import { useEffect, useState, ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectedRouter = ({ children }: MyComponentProps) => {
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserState(setUser).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      console.log(user);
      navigate("/signin");
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRouter;
