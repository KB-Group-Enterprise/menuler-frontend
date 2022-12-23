<template>
  <button
    class="transition transition-color disabled:grayscale"
    :class="[big ? bigStyles : baseStyles, primary ? primaryColor : color]"
    type="button"
  >
    <template v-if="!isLoading">
      <div v-if="icon">
        <IconifyIcon :icon="icon" :class="texts"></IconifyIcon>
      </div>
      <div :class="texts">
        <slot></slot>
      </div>
    </template>
    <div v-else>
      <IconifyIcon icon="eos-icons:three-dots-loading" :class="texts"></IconifyIcon>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  primary: {
    type: Boolean,
    required: false,
    default: false,
  },
  big: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: String,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  baseStyles: {
    type: String,
    required: false,
    default:
      "w-full rounded-lg flex flex-rows items-center justify-center space-x-3 text-sm h-10",
  },
  color: {
    type: String,
    required: false,
    default:
      "bg-blue-600 text-blue-50 hover:bg-blue-500 disabled:bg-main-400 disabled:text-main-600",
  },
  texts: {
    type: String,
    required: false,
    default: "font-bold text-sm",
  },
});
const bigStyles =
  "w-full rounded-lg flex flex-rows items-center justify-center space-x-3 h-16";
const primaryColor =
  "bg-emerald-600 text-emerald-50 hover:bg-emerald-500 disabled:bg-main-400 disabled:text-main-600";
</script>
