import { LanguageModeToggle } from "@/components/header/language-mode-toggle";
import { ModeToggle } from "@/components/header/mode-toggle";
import { UserSettingsDropdown } from "@/components/header/user-settings-dropdown";
import { useTranslation } from "react-i18next";

const AppHeader = () => {
  const { t } = useTranslation();

  return (
    <nav className="flex h-14 w-full items-center gap-5 bg-white p-2 shadow-md dark:bg-gray-900 md:p-5">
      <div className="flex-1 text-4xl">
        <span className="text-3xl font-bold text-blue-600 md:text-4xl">
          {t("peer")}
        </span>
        <span className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          {t("pulse")}
        </span>
      </div>
      <LanguageModeToggle />
      <ModeToggle />
      <UserSettingsDropdown />
    </nav>
  );
};

export default AppHeader;
