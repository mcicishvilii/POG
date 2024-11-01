import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';


// Import your translations
const resources = {
  en: {
    translation: {
      mainText: "Prosecution Service",
      comainText:"of Georgia"
    }
  },
  ge: {
    translation: {
      mainText: "საქართველოს",
      comainText:"პროკურატურა"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ge', // default language
    fallbackLng: 'ge',
    
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;