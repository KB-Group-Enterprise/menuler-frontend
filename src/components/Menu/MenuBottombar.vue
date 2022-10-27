<template>
  <div
    class="w-full bg-white h-14 flex md:px-10 px-2 items-center shadow text-main justify-between"
  >
  <div class="w-full flex justify-center items-center cursor-pointer">
    ตระกร้าสินค้า {{ selectedFoodList.length}} ชิ้น
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobal, closeSideBar } from '@/providers/global';
import BaseToggleMenu from '../Base/BaseToggleMenu.vue';
import { useAuth } from '@/providers/auth';
import { selectedFoodList } from '@/composable/menu-state';

// console.log(!(modalMenuSelect && modalMenuBasket));



</script>

<style scoped></style>
