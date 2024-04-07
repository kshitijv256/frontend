import { LanguageModeToggle } from "@/components/header/language-mode-toggle";
import { ModeToggle } from "@/components/header/mode-toggle";
import { UserSettingsDropdown } from "@/components/header/user-settings-dropdown";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <nav className="flex h-14 w-full items-center gap-5 bg-white p-2 shadow-md dark:bg-gray-900 md:p-5">
      <div className="flex-1 text-5xl">
        <span className="text-3xl font-bold text-amber-500 md:text-4xl">
          {t("peer")}
        </span>
        <span className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          {t("pulse")}
        </span>
      </div>
      <Button onClick={() => navigate("/")}>Feed</Button>
      <Button onClick={() => navigate("/chat")}>Chat</Button>
      <LanguageModeToggle />
      <ModeToggle />
      <UserSettingsDropdown />
    </nav>
  );
};

export default AppHeader;
