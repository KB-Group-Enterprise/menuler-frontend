<template>
  <div class="w-full min-h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20">
      <div class="absolute right-2" @click="close">x</div>
      <div class="w-full"> 
    <div class="w-full h-60 bg-gray-50 flex justify-center items-center">
        Images
    </div>
    <div class="px-8">
        <div class="w-full bg-white rounded-md px-4 py-2 -mt-5 shadow">{{menuItem.foodName}}</div>
    </div>
    <div class="px-4 mt-4 flex flex-col gap-4">
        <div class="flex flex-col" v-for="(item,index) in 3" :key="index">
            <div>Topic</div>
            <div class="text-sm px-4">
                <div class="flex flex-row items-center gap-x-2" v-for="(option,index) in 4" :key="index">
                    <input type="checkbox" />
                    <div>Option {{index+1}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-row justify-center gap-x-4 mt-4">
        <div class="w-10 h-10 rounded-full shadow bg-white flex justify-center items-center text-2xl" @click="menuCount--">-</div>
        <div class="w-10 h-10 flex justify-center items-center text-2xl">{{menuCount}}</div>
        <div class="w-10 h-10 rounded-full shadow bg-white flex justify-center items-center text-2xl" @click="menuCount++">+</div>
    </div>
    <div class="px-4 mt-4">
        <div class="w-full bg-gray-50 py-2 rounded-md shadow text-center" @click="addMenu">เพิ่ม</div>
    </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, readonly, watch, ref, defineProps, onMounted } from 'vue';
import { modalMenuBasket,menuItem,menuCount,menuBasket } from '@/composable/menu-state';

const close = () => {
    modalMenuBasket.value = false
    console.log('close');
}

const addMenu = () => {
    for (let index = 0; index < menuCount.value; index++) {
        menuBasket.value.push(menuItem.value.id)
    }
    console.log(menuBasket.value);
    close()
}
</script>
