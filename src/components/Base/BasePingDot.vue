<template>
  <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
      :class="['bg-' + color + '-400', ...classname]"
    />
    <span
      class="relative inline-flex rounded-full h-3 w-3"
      :class="['bg-' + color + '-500', ...classname]"
    />
  </span>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'red',
  },
  classname: {
    default: [''],
  },
});
</script>

<style scoped></style>
