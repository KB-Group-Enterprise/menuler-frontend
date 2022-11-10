<template>
  <div
    class="max-w-screen w-full relative"
    :class="isModalOpen || modalMenuBasket || modalMenuSelect || modalCheckout || modalMenuOrder  ? 'h-screen overflow-hidden' : ''"
  >
    <LayoutNavbar v-if="auth.state.loggedIn" />
    
    <!-- <LayoutSidebar />  -->
    <Transition name="component-fade bg-red-500">
      <div class="max-w-md mx-auto relative pb-14">
        <!-- <layout-navbar /> -->
      <router-view />
      </div>
    </Transition>
    <LayoutGlobalModal />
  </div>
</template>

<style></style>

<script setup lang="ts">
import LayoutNavbar from "../components/Layout/LayoutNavbar.vue";
import LayoutSidebar from "@/components/Layout/LayoutSidebar.vue";
import LayoutGlobalModal from "@/components/Layout/LayoutGlobalModal.vue";
import { useGlobal } from "@/providers/global";
import { computed, ref, toRaw, watch } from "vue";
import { useRouter } from "vue-router";
import scrollToTop from "@/utils/helper/scrollToTop";
import { useEapi } from "@/providers";
import {modalMenuSelect,
  modalMenuBasket,
  modalCheckout,
  modalMenuOrder,} from '@/composable/menu-state'; 
import { useAuth } from "@/providers/auth";

const global = useGlobal();
const isSidebarOpen = computed(() => global.state.isSidebarOpen);
const isModalOpen = computed(() => global.state.isModalOpen);

const router = useRouter();
const auth = useAuth();


watch(router.currentRoute, () => {
  scrollToTop();
});
</script>

<style scoped></style>
