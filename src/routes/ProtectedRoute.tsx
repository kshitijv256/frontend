import { LocalStorageKeys } from "@/config/constants";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { pathname } = useLocation();

  const authenticated =
    !!localStorage.getItem(LocalStorageKeys.accessToken) &&
    !!localStorage.getItem(LocalStorageKeys.refreshToken);
  if (authenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/sign-in" replace state={{ referrer: pathname }} />;
}
