import i18n from 'i18next';
import vnLocales from './vi'
import enLocales from './en'

import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      ...enLocales
    },
  },
  fr: {
    translation: {
      ...vnLocales
    },
  },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language
  fallbackLng: 'en', // Fallback language if a translation is not available
});
export default i18n;