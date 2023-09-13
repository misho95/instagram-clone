import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { checkUserOrRedirect } from "./utils/helper.script";
import LoadingComponent from "./components/loading.component";
import { updateDataInServer } from "./utils/firebase";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectedRouter = ({ children }: MyComponentProps) => {
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateUserActiveStatus = async () => {
    window.addEventListener("beforeunload", async (event) => {
      event.preventDefault();
      if (user) {
        await updateDataInServer("users", user.id, "userActive", false);
      }
    });
  };

  useEffect(() => {
    checkUserOrRedirect(setUser, setLoading, navigate);
  }, []);

  useEffect(() => {
    updateUserActiveStatus();
  }, [user]);

  if (loading) {
    return <LoadingComponent />;
  }

  return children;
};

export default ProtectedRouter;
