import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import { auth } from '../providers/auth';
import TestingPage from '../pages/TestingPage.vue';
import CustomerSelectMenuPage from '../pages/customer/CustomerSelectMenuPage.vue';
import BusinessEditInformationPage from '../pages/business/BusinessEditInformationPage.vue';
import BusinessEditMenuPage from '../pages/business/BusinessEditMenuPage.vue';
import BusinessEditTableQRPage from '../pages/business/BusinessEditTableQRPage.vue';
import BusinessLoginPage from '../pages/business/BusinessLoginPage.vue';
import BusinessRegisterPage from '../pages/business/BusinessRegisterPage.vue';
import BusinessDashboardPage from '../pages/business/BusinessDashboardPage.vue';






const routes = [
  { name: 'Home', path: '/', component: Home },
  // { path: '/', redirect: '/purchase' },
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
  // { name: 'PurchaseById', path: '/coupon/:id', component: PurchaseStatusVue },
  // { name: 'Purchase', path: '/purchase', component: Purchase },
  // { name: 'Status', path: '/admin/status', component: AdminStatusPage },
  { name: 'Test', path: '/test', component: TestingPage },
  { name: 'CustomerSelectMenuPage', path: '/customer/menu/:token', component: CustomerSelectMenuPage },
  { name: 'BusinessEditInformationPage', path: '/business', component: BusinessEditInformationPage, meta: { auth: true } },
  { name: 'BusinessEditMenuPage', path: '/business/menu', component: BusinessEditMenuPage, meta: { auth: true } },
  { name: 'BusinessEditTableQRPage', path: '/business/table', component: BusinessEditTableQRPage, meta: { auth: true } },
  { name: 'BusinessLoginPage', path: '/business/login', component: BusinessLoginPage },
  { name: 'BusinessRegisterPage', path: '/business/register', component: BusinessRegisterPage },
  { name: 'BusinessDashboardPage', path: '/business/dashboard', component: BusinessDashboardPage, meta: { auth: true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from) => {
  if (auth.state.loggedIn || to.meta.auth) {
    await auth.fetchProfile();
    // await auth.checkAcessToken();
    console.log({ loggedIn: auth.state.loggedIn })
    if (!auth.state.loggedIn) {
      return { name: 'BusinessLoginPage' };
    }
  }
});

export default router;
