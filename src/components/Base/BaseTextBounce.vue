<template>
  <div class="flex text-2xl font-[500] mt-2 space-x-[0.1rem]" :class="[...classname]">
    <b v-for="(e, i) in spliting()" :key="e + i" :style="animate(i)">{{ e }}</b>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 2 },
  classname: { required: false, default: [''] },
});

function spliting() {
  return props.text.split('');
}

function animate(i: number) {
  return { animation: `bounce-4 ${props.speed}s ease infinite ${(i * props.speed) / 10}s` };
}
</script>

<style>
@keyframes bounce-4 {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
