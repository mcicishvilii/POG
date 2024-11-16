import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';


const resources = {
  en: {
    translation: {
      mainText: "Prosecution Service",
      comainText: "of Georgia",
      news: "News",
      searchPlaceholder: "Search...",
      backButtonText: "Back",
      video: "Video",
    },
  },
  ge: {
    translation: {
      mainText: "საქართველოს",
      comainText: "პროკურატურა",
      news: "სიახლეები",
      video: "ვიდეო",
      searchPlaceholder: "ძიება...",
      backButtonText: "უკან დაბრუნება",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ge',
    fallbackLng: 'ge',
    
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;