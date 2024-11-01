// types/i18next.d.ts
import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: {
        appName: string;
        navigation: {
          home: string;
          highScores: string;
          settings: string;
        };
        home: {
          welcome: string;
        };
      };
    };
  }
}