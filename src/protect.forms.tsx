import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUserState } from "./utils/helper.script";

const ProtectForms = ({ children }) => {
  const navigate = useNavigate();
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);

  useEffect(() => {
    checkUserState(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return children;
};

export default ProtectForms;
