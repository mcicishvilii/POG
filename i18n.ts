import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';
import { contains } from 'ramda';


const resources = {
  en: {
    translation: {
      mainText: "Prosecution Service",
      comainText: "of Georgia",
      news: "News",
      searchPlaceholder: "Search...",
      backButtonText: "Back",
      video: "Video",
      footer: {
        news: "News",
        address: "Address",
        contact: "Contact",
        kancelaria: "Kancelaria",
        phoneNumbers: "Phone Numbers",
        email: "Email: presscenter@pog.gov.ge",
        logoText1: "Prosecution Service",
        logoText2: "of Georgia",
        disabledInfo: "Website Adapted for Accessibility",
        allRightsReserved: "© All Rights Reserved 2024",
        createdBy: "Created by Proservice"
      }
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
      footer: {
        news: "სიახლეები",
        address: "მისამართი: ქ.თბილისი, გორგასლის ქუჩა N24, 0114",
        contact: "კონტაქტი",
        kancelaria: "კანცელარია:",
        phoneNumbers: "ტელეფონის ნომრები",
        email: "ელ-ფოსტა: presscenter@pog.gov.ge",
        logoText1: "საქართველოს",
        logoText2: "პროკურატურა",
        disabledInfo: "ვებგვერდიადაპტირებულია",
        allRightsReserved: "© ყველა უფლება დაცულია 2024",
        createdBy: "შექმნილია Proservice-ის მიერ"
      }
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