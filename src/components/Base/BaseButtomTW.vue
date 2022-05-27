<template>
  <button
    :type="type"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
  }
});
</script>

<style scoped></style>
