import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(resourcesToBackend((language: String, namespace: String, callback: Function) => {
    import(`./i18n/${language}/${namespace}.json`)
      .then((resources) => {
        return callback(null, resources)
      })
      .catch((error) => {
        callback(error, null)
      })
  }))
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "de",
    // debug: true,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
