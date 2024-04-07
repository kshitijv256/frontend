import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { AuthProvider } from "@/providers/authProvider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <div>
        <AppHeader />
        <main>
          <div className="max-w-8xl mx-auto bg-gray-100  dark:bg-gray-800">
            <Outlet />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default AppLayout;
