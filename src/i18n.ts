import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locales/en.json";
import hiJSON from "./locales/hi.json";
import {
  format as formatDate,
  formatDistance,
  formatRelative,
  isDate,
} from "date-fns";
import { hi, enUS } from "date-fns/locale";

const locales = { hi, enUS };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "enUS",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        const locale = locales[lng as keyof typeof locales];
        if (isDate(value)) {
          if (format === "shortDate") return formatDate(value, "P", { locale });
          if (format === "longDate")
            return formatDate(value, "PPPP", { locale });
          if (format === "relative")
            return formatRelative(value, new Date(), { locale });
          if (format === "ago")
            return formatDistance(value, new Date(), {
              locale,
              addSuffix: true,
            });
          if (format === "shortTime") return formatDate(value, "p", { locale });
          if (format === "longTime") return formatDate(value, "pp", { locale });
          return formatDate(value, format || "", { locale });
        }
        return value;
      },
    },
    resources: {
      enUS: {
        translation: {
          ...enJSON.translation,
        },
      },
      hi: {
        translation: {
          ...hiJSON.translation,
        },
      },
    },
  });

export default i18n;
