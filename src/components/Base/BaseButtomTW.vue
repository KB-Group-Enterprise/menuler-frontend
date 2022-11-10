<template>
  <button
    :type="type as any"
    :class="template[color]"
  >
    <span v-show="!isLoading">
      <slot></slot>
    </span>
    <span v-show="isLoading">
      <div
        class="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String,
    required: false,
    default: 'primary'
  },
  type: {
    type: String,
    required: false,
    default: 'button'
  },
  customClass: {
    type: String,
    required: false,
    default: ''
  },
});
const template: Record<string, string> = {
  primary: 'inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  secondary: 'inline-block px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  success: 'inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  successna: 'inline-block px-6 py-2 border-2 border-orange-500 bg-orange-500 text-white font-medium text-sm leading-tight uppercase rounded-b hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  danger: 'inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  warning: 'inline-block px-6 py-2 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  warningna: 'inline-block px-6 py-2 border-2 border-yellow-500 bg-yellow-500 text-white font-medium text-sm leading-tight uppercase rounded-b hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  info: 'inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  light: 'inline-block px-6 py-2 border-2 border-gray-200 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
  dark: ''
}
</script>

<style scoped></style>
