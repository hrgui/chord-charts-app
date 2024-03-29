import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import setlist from "../../public/locales/en-US/setlist.json";
import song from "../../public/locales/en-US/song.json";
import translation from "../../public/locales/en-US/translation.json";

i18n.use(initReactI18next).init({
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation,
      setlist,
      song,
    },
  },
});
