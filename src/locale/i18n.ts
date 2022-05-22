import { createI18n } from "vue-i18n";
import en from './en.json'
import th from './th.json'

export default createI18n({
  // legacy: false, // use Composition API
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en, th
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0
      }
    },
  }
})
