import SignIn from "@/pages/sign-in";
import AppLayout from "../layouts/app";
import { createBrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import SignUp from "@/pages/sign-up";
import Home from "@/pages/home";
import VerifyEmail from "@/pages/verify-email";
import Logout from "@/pages/logout";
import ProtectedRoute from "./ProtectedRoute";
import Post from "@/pages/post/[id]";
import Profile from "@/pages/profile";

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/post/:id",
        element: <Post />,
      },
    ],
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/logout", element: <Logout /> },
]);

export default router;
