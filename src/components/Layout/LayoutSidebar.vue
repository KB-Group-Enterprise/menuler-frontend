<template>
  <div class="relative">
    <Transition name="component-fade" type="transition">
      <div
        @click="closeSideBar"
        v-if="isSidebarOpen"
        class="w-screen h-screen fixed top-14 right-0 z-50 bg-background-dark left-0 bg-opacity-50 backdrop-blur-md"
      />
    </Transition>
    <div
      class="w-[90%] bg-background-medium md:w-[28rem] h-screen fixed top-14 right-0 z-50 p-4 flex flex-col space-y-3 overflow-scroll transition-all duration-200 ease-in-out"
      :class="!isSidebarOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'"
    >
      <h1 class="text-center text-2xl font-bold text-main">เมนู</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobal, closeSideBar } from '@/providers/global';
import { computed } from 'vue';

const global = useGlobal();
const isSidebarOpen = computed(() => global.state.isSidebarOpen);
</script>

<style scoped></style>
