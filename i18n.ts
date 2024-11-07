import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';


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
    lng: 'ge',
    fallbackLng: 'ge',
    
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;