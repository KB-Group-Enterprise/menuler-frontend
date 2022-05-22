<template>
  <div class="flex justify-center bg-white items-center w-screen h-screen fixed top-0 left-0 z-50">
    <div class="w-full flex flex-col">
    <Vue3Lottie :animationData="LoadingLottie" :height="180" :width="180" />
    <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import LoadingLottie from '@/assets/lottie/loading.json';
const props = defineProps({
  absolute: { required: false, default: false },
});
</script>

<style scoped>
.position-class {
  left: 50%;
  transform: translateX(-50%);
}
</style>
