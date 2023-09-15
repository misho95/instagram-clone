import { userSignIn } from "./utils/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { checkUserOrRedirect } from "./utils/helper.script";
import LoadingComponent from "./components/loading.component";
import { updateDataInServer } from "./utils/firebase";
import { useIdle } from "@mantine/hooks";

interface MyComponentProps {
  children: ReactNode;
}

const ProtectedRouter = ({ children }: MyComponentProps) => {
  const idle = useIdle(10000);
  const user = userSignIn((state) => state.user);
  const setUser = userSignIn((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateUserActiveStatus = async () => {
    window.addEventListener("beforeunload", async () => {
      if (user) {
        await updateDataInServer("users", user.id, "userActive", false);
      }
    });
  };

  const checkUserIfIsIdle = async () => {
    if (idle && user) {
      await updateDataInServer("users", user.id, "userActive", false);
    } else if (!idle && user) {
      await updateDataInServer("users", user.id, "userActive", true);
    }
  };

  useEffect(() => {
    checkUserOrRedirect(setUser, setLoading, navigate);
  }, []);

  useEffect(() => {
    updateUserActiveStatus();
  }, [user]);

  useEffect(() => {
    checkUserIfIsIdle();
  }, [idle]);

  if (loading) {
    return <LoadingComponent />;
  }

  return children;
};

export default ProtectedRouter;
