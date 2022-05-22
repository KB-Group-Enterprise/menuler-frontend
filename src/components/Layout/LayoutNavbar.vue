<template>
  <div
    class="w-screen fixed z-10 top-0 left-0 h-14 flex md:px-10 px-2 items-center bg-navbar border-white text-main justify-between"
  >
    <RouterLink to="/" @click="closeSideBar" class="flex">
      <div class="inline-flex items-center">
        <!-- <TextBounce class="ml-2" text="HUAYGO" :classname="['text-main']" /> -->
        <h1 class="ml-2 text-2xl font-bold text-main">GOLF</h1>
      </div>
    </RouterLink>
    <div class="flex items-center">
      <!--  -->

      <!--  -->
      <BaseToggleMenu @click="toggle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobal, closeSideBar } from '@/providers/global';
import BaseToggleMenu from '../Base/BaseToggleMenu.vue';
import { useAuth } from '@/providers/auth';

const global = useGlobal();

const toggle = () => {
  global.mutateState((state) => {
    console.log(state.isSidebarOpen);
    state.isSidebarOpen = !state.isSidebarOpen;
  });
};
</script>

<style scoped></style>
