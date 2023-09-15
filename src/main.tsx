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
import EditProfile from "./pages/edit.profile";
import ArchiveStories from "./pages/archive.stories";
import MobileHeader from "./components/mobile.header";
import UserComponent from "./components/user.components";
import ErrorPage from "./pages/error.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <MobileHeader />
        <UserComponent />
        <HomePage />
      </ProtectedRouter>
    ),
  },
  {
    path: "/:userId/",
    element: (
      <ProtectedRouter>
        <MobileHeader />
        <UserProfile />
      </ProtectedRouter>
    ),
  },
  {
    path: "/account/edit",
    element: (
      <ProtectedRouter>
        <MobileHeader />
        <EditProfile />
      </ProtectedRouter>
    ),
  },
  {
    path: "/archive/stories",
    element: (
      <ProtectedRouter>
        <MobileHeader />
        <ArchiveStories />
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
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
