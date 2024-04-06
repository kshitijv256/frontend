import { checkAccessTokenValidity } from "@/api/common";
import { LanguageModeToggle } from "@/components/header/language-mode-toggle";
import { Button } from "@/components/ui/button";
import { LocalStorageKeys } from "@/config/constants";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  alternateRoute: string;
  alternateRouteText: string;
  bgImage?: string;
  title: string;
  subTitle?: string;
  onSubmit?: (data: object) => void;
  isLoading?: boolean;
  error?: string;
  clearError?: () => void;
}

const AuthPageLayout = ({
  children,
  alternateRoute,
  alternateRouteText,
  title,
  subTitle,
  isLoading,
  error,
  clearError,
}: AuthPageLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);

    const checkLoggedIn = async () => {
      if (accessToken) {
        const isValid = await checkAccessTokenValidity(accessToken);
        if (isValid) navigate("/");
      }
    };
    checkLoggedIn();
  }, [navigate]);
  return (
    <div className="mx-auto grid grid-cols-1 bg-gray-950 md:h-screen md:grid-cols-2">
      {error && (
        <div className="bg-red-500 p-3 text-center text-white">
          {error}
          <button onClick={clearError}>X</button>
        </div>
      )}
      {isLoading && <div>Loading...</div>}
      <div className="flex px-5 py-3 text-4xl font-bold text-white md:px-10 md:py-5">
        <p className="font-bold text-blue-600">{t("peer")}</p>
        <p className="font-bold text-white">{t("pulse")}</p>
      </div>
      <div className="flex flex-col bg-white">
        <div className="flex justify-end gap-2 px-5 py-2 md:px-10 md:py-5">
          <Button
            variant="ghost"
            onClick={() => navigate(alternateRoute)}
            className="text-gray-950"
          >
            {alternateRouteText}
          </Button>
          <LanguageModeToggle />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="px-5 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm">{subTitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
