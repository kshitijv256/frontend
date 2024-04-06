import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

export enum language {
  enUS = "enUS",
  hi = "hi",
}

type languageProviderProps = {
  children: React.ReactNode;
};

type languageProviderState = {
  language: language;
  setLanguage: (language: language) => void;
};

const initialState: languageProviderState = {
  language: language.enUS,
  setLanguage: () => null,
};

const LanguageProviderContext =
  createContext<languageProviderState>(initialState);

export function LanguageProvider({ children }: languageProviderProps) {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    }
  }, [changeLanguage]);

  const setLanguage = (selectedLanguage: language) => {
    localStorage.setItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);
  };

  return (
    <LanguageProviderContext.Provider
      value={{ language: language as language, setLanguage }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export default LanguageProvider;

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
