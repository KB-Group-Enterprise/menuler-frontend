<template>
  <LayoutContainer>
    <BusinessHeader />
    <div class="w-10/12">
      <h1 class="text-center">Restaurant's Menu</h1>
      <div class="flex justify-center text-gray-600 cursor-pointer transition-all hover:scale-105 mt-8" @click="router.push('/business/menu/add')">
        <div class="flex flex-col justify-center">
          <IconifyIcon icon="carbon:add-alt" class="mx-1"></IconifyIcon>
        </div>
        เพิ่มเมนู
      </div>
      <div 
      v-for="item,index in menus" 
      :key="index"
      class="flex flex-col my-2 w-full items-center"
      >
      <div class="flex w-full space-x-2 shadow-md p-2">
        <div class="h-24 rounded overflow-hidden">
          <img :src="item.imageUrl" class="w-32 h-full bg-gray-300 rounded object-cover" />
        </div>
        <div class="text-left w-full">
          <div class="font-semibold">{{ item.foodName }}</div>
          <div class="">{{ item.price }} ฿</div>
          <div>{{ item.category }}</div>
          <div class="flex justify-between w-full">
            <button class="text-gray-400" @click="router.push(`menu/${item.id}`)">แก้ไข</button>
            <button class="text-red-400" @click="deleteMenu(item)">ลบ</button>
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
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from "@/components/Layout/LayoutContainer.vue";
import { useEapi } from "@/providers";
import { BussinessMenuItem } from "@/types/dto.types";
import { computed, ref } from "vue";
import BusinessHeader from "@/components/Business/BusinessHeader.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import { useRouter } from "vue-router";
import { Swaler } from "@/utils/helper/swaler";
import { useAuth } from "@/providers/auth";

const eapi = useEapi();
const menus = ref<BussinessMenuItem[]>([]);
const router = useRouter();
const auth = useAuth();

const profile = computed(() => auth.state.user);


const fetchData = async () => {
  const result = await eapi.menu.getMenuByRestaurantId(profile.value?.restaurant.id);
  if (result.success && result.data) {
    menus.value = result.data.menu;
  }
}

const deleteMenu = async (menu: BussinessMenuItem) => {
  const ans = await Swaler.question(`ว่าจะลบเมนู "${menu.foodName}" ทิ้ง`)
  if (ans.isConfirmed) {
    const result = await eapi.menu.deleteMenu(menu.id, { noticeSuccess: true });
    if (result.success) {
      fetchData();
    }
  }
}

fetchData();

</script>