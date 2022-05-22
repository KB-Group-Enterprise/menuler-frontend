<template>
  <div
    class="flex flex-col space-y-4 min-w-screen h-screen fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-50"
  >
    <div class="w-full h-full absolute z-50" @click.prevent="$emit('close')"></div>
    <div
      class="flex flex-col relative z-50 shadow-md hover:shodow-lg rounded-lg overflow-hidden"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isModalActive: Boolean,
});
</script>

<style scoped></style>
