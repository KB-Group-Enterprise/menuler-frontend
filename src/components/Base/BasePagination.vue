<template>
  <div class="flex flex-col items-center my-8 select-none text-main">
    <div v-show="totalPage > 1" class="flex">
      <div class="h-8 w-8 mr-1 flex justify-center items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-4 h-4"
          @click="onChangePage(currentPage - 1)"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      <div class="flex h-8 font-medium">
        <div
          v-for="n in totalPage"
          v-show="totalPage <= 6"
          :key="n"
          :class="`
            w-8
            flex
            justify-center
            items-center
            cursor-pointer
            leading-5
            transition
            duration-150
            ease-in
            border-t-2 ${
              currentPage == n ? 'border-orange-600' : 'border-transparent'
            }
          `"
          @click="onChangePage(n)"
        >
          {{ n }}
        </div>
        <div
          v-show="totalPage > 6"
          :class="`
            w-8
            flex
            justify-center
            items-center
            cursor-pointer
            leading-5
            transition
            duration-150
            ease-in
            border-t-2 ${
              currentPage == 1 ? 'border-orange-600' : 'border-transparent'
            }
          `"
          @click="onChangePage(1)"
        >
          1
        </div>
        <div
          v-show="totalPage > 6 && currentPage > 3"
          class="w-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent"
        >
          ...
        </div>
        <div
          v-show="totalPage > 6 && currentPage > 2"
          class="w-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent"
          @click="onChangePage(currentPage - 1)"
        >
          {{ currentPage - 1 }}
        </div>
        <div
          v-show="totalPage > 6 && currentPage > 2 && currentPage < totalPage"
          class="w-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-orange-600"
        >
          {{ currentPage }}
        </div>
        <div
          v-show="
            totalPage > 6 && currentPage > 2 && currentPage < totalPage - 1
          "
          class="w-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent"
          @click="onChangePage(currentPage + 1)"
        >
          {{ currentPage + 1 }}
        </div>
        <div
          v-show="totalPage > 6 && currentPage < 3"
          :class="`
            w-8
            flex
            justify-center
            items-center
            cursor-pointer
            leading-5
            transition
            duration-150
            ease-in
            border-t-2 ${
              currentPage == 2 ? 'border-orange-600' : 'border-transparent'
            }
          `"
          @click="onChangePage(2)"
        >
          2
        </div>
        <div
          v-show="totalPage > 6 && currentPage < 3"
          :class="`
            w-8
            flex
            justify-center
            items-center
            cursor-pointer
            leading-5
            transition
            duration-150
            ease-in
            border-t-2 ${
              currentPage == 3 ? 'border-orange-600' : 'border-transparent'
            }
          `"
          @click="onChangePage(3)"
        >
          3
        </div>
        <div
          v-show="totalPage > 6 && currentPage < 3"
          :class="`
            w-8
            flex
            justify-center
            items-center
            cursor-pointer
            leading-5
            transition
            duration-150
            ease-in
            border-t-2 ${
              currentPage == 4 ? 'border-orange-600' : 'border-transparent'
            }
          `"
          @click="onChangePage(4)"
        >
          4
        </div>
        <div
          v-show="totalPage > 6 && currentPage <= 7"
          class="w-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent"
        >
          ...
        </div>
        <div
          v-show="totalPage > 6"
          :class="`
            w-8
            flex
            justify-center
            items-center
            cursor-pointer
            leading-5
            transition
            duration-150
            ease-in
            border-t-2 ${
              currentPage == totalPage
                ? 'border-orange-600'
                : 'border-transparent'
            }
          `"
          @click="onChangePage(totalPage)"
        >
          {{ totalPage }}
        </div>
      </div>
      <div
        class="h-8 w-8 ml-1 flex justify-center items-center cursor-pointer"
        @click="onChangePage(currentPage + 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right w-4 h-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Component, Prop, Vue } from 'nuxt-property-decorator';
const props = defineProps({
    currentPage: {
        type: Number,
        required: true        
    },
    totalPage: {
        type: Number,
        required: true,
    }
})
const emit = defineEmits(['page-change'])
const onChangePage = (page: number) => {
    emit('page-change', page);    
}
</script>
