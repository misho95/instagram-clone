import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { checkUserOrRedirectForUserForm } from "./utils/helper.script";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectForms = ({ children }: MyComponentProps) => {
  const navigate = useNavigate();
  const setUser = userSignIn((state) => state.setUser);

  useEffect(() => {}, []);

  useEffect(() => {
    checkUserOrRedirectForUserForm(setUser, navigate);
  }, []);

  return children;
};

export default ProtectForms;
