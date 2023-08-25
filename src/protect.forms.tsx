import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { checkUserState } from "./utils/helper.script";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectForms = ({ children }: MyComponentProps) => {
  const navigate = useNavigate();
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);

  useEffect(() => {
    if (!user) {
      checkUserState(setUser);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  return children;
};

export default ProtectForms;
