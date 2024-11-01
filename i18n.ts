import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
const resources = {
  en: {
    translation: {
      appName: "განძი",
      navigation: {
        home: "Home",
        highScores: "High Scores",
        settings: "Settings"
      },
      home: {
        welcome: "Welcome to {{appName}}!"
      }
    }
  },
  ge: {
    translation: {
      appName: "განძი",
      navigation: {
        home: "Home",
        highScores: "High Scores",
        settings: "Settings"
      },
      home: {
        welcome: "სალამი to {{appName}}!"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;