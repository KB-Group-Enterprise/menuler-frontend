<template>
  <BasePagination
    :current-page="currentPage"
    :total-page="totalPage"
    @page-change="pageChange"
  ></BasePagination>
</template>

<script setup lang="ts">
import BasePagination from './BasePagination.vue'
import { computed } from '@vue/runtime-dom';
const props = defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  }
})

const totalPage = computed(() => {
  const totalPage = Math.ceil(props.totalCount / props.row);
  return totalPage;
})

const emit = defineEmits(['page-change'])
const pageChange = (page: number) => {
  if (page > totalPage.value || page < 1) return;
  emit('page-change', page);
}


</script>

<style lang="scss"></style>
