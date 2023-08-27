import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { checkUserOrRedirect } from "./utils/helper.script";
import LoadingComponent from "./components/loading.component";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectedRouter = ({ children }: MyComponentProps) => {
  const setUser = userSignIn((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserOrRedirect(setUser, setLoading, navigate);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return children;
};

export default ProtectedRouter;
