import { global } from './providers/global';
// satic config
import router from './router';

// dependencies
import { createApp } from 'vue';
import Toast, { PluginOptions } from 'vue-toastification';
import { Icon } from '@iconify/vue';
// main App.js
import App from './App.vue';

// assets files
import '@/assets/css/global.css';
import '@/assets/css/tailwind.css';
// import 'tw-elements';
import 'sweetalert2/src/sweetalert2.scss';
import 'vue-toastification/dist/index.css';
import 'vue3-lottie/dist/style.css';
//  injectable providers
import { AuthKey, AxiosKey, EapiKey, GlobalKey } from './symbols/symbol';
import { http } from './providers/http';
import { auth } from './providers/auth';
import { initEapi } from './providers/eapi/eapi';
import Vue3Lottie from 'vue3-lottie';
import i18n from './locale/i18n';
// vee-validate
// config vee-validate
import { configure, defineRule } from "vee-validate";
import { localize, setLocale } from '@vee-validate/i18n';
import { required, between, confirmed, email } from '@vee-validate/rules';
import th from '@vee-validate/i18n/dist/locale/th.json';

configure({
  generateMessage: localize({
    th,
  }),
});
setLocale('th');
defineRule('required', required);
defineRule('between', between);
defineRule('confirmed', confirmed);
defineRule('email', email);


const app = createApp(App);
app.use(Toast, { maxToasts: 1, timeout: 1000, hideProgressBar: true } as PluginOptions);
app.use(router);
app.use(Vue3Lottie);
app.use(i18n);
// providing config
app.provide(AxiosKey, http);
app.provide(AuthKey, auth);
app.provide(GlobalKey, global);
app.provide(EapiKey, initEapi());
app.component('IconifyIcon', Icon);

app.mount('#app');
