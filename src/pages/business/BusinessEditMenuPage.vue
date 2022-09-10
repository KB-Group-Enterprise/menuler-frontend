<template>
  <LayoutContainer>
    <BusinessHeader />
    <div class="w-10/12">
      <h1 class="text-center">Restaurant's Menu</h1>
      <div 
      v-for="item,index in menus" 
      :key="index"
      class="flex flex-col my-2 w-full items-center"
      >
      <div class="flex w-full space-x-2 shadow-md p-2">
        <div class="h-24 rounded overflow-hidden">
          <img :src="item.imageUrl" class="w-24 h-full bg-gray-300 rounded object-cover" />
        </div>
        <div class="text-left w-full">
          <div class="font-semibold">{{ item.foodName }}</div>
          <div class="">{{ item.price }} ฿</div>
          <div>{{ item.category }}</div>
          <div class="flex justify-between w-full">
            <button class="text-gray-400 underline underline-offset-2">edit</button>
            <button class="text-red-400 underline underline-offset-2">delete</button>
          </div>
          <!-- <div>
            <span v-if="Boolean(item.description)" >
             {{ item.description }}
            </span>
            <span class="text-gray-500" v-else>
              no description
            </span>
          </div> -->
        </div>
      </div>
      </div>
      <div class="flex justify-center text-gray-600 cursor-pointer transition-all hover:scale-105 mt-8" @click="router.push('/business/menu/add')">
        <div class="flex flex-col justify-center">
          <IconifyIcon icon="carbon:add-alt" class="mx-1"></IconifyIcon>
        </div>
        ADD MENU
      </div>
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from "@/components/Layout/LayoutContainer.vue";
import { useEapi } from "@/providers";
import { BussinessMenuItem } from "@/types/dto.types";
import { ref } from "vue";
import BusinessHeader from "@/components/Business/BusinessHeader.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import { useRouter } from "vue-router";

const eapi = useEapi();
const menus = ref<BussinessMenuItem[]>([]);
const router = useRouter();

const fetchData = async () => {
  const result = await eapi.menu.getMenuByRestaurantId('630f386166de60947795adfb');
  if (result.success && result.data) {
    menus.value = result.data.menu;
  }
}

fetchData();

</script>