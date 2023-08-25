import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.page";
import SignIn from "./pages/sign.in";
import SignUp from "./pages/sign.up";
import ProtectedRouter from "./protected.router";
import ProtectForms from "./protect.forms";
import UserProfile from "./pages/user.profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <HomePage />
      </ProtectedRouter>
    ),
  },
  {
    path: "/:userId/",
    element: (
      <ProtectedRouter>
        <UserProfile />
      </ProtectedRouter>
    ),
  },
  {
    path: "/signin",
    element: (
      <ProtectForms>
        <SignIn />
      </ProtectForms>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectForms>
        <SignUp />
      </ProtectForms>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
