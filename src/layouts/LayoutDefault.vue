<template>
  <div
    class="max-w-screen w-full relative"
    :class="isModalOpen ? 'h-screen overflow-hidden' : ''"
  >
    <!-- <LayoutNavbar />
    <LayoutSidebar /> -->
    <Transition name="component-fade">
      <router-view />
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

const global = useGlobal();
const isSidebarOpen = computed(() => global.state.isSidebarOpen);
const isModalOpen = computed(() => global.state.isModalOpen);

const router = useRouter();


watch(router.currentRoute, () => {
  scrollToTop();
});
</script>

<style scoped></style>
