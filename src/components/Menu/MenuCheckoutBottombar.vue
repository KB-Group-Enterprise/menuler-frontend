<template>
  <div class="w-full">
    <div v-if="notiTableData.order && (notiTableData.order.clientState === 'CONFIRMED' || notiTableData.order.clientState === 'BILLING')" class="flex flex-nowrap justify-between p-4">
      <span>ราคารวม </span>
      <span class="text-yellow-500">{{ orderedFoodPrice }} บาท</span>
    </div>
    <div
      class="w-full bg-white h-14 flex md:px-10 px-2 items-center shadow text-main justify-between"
    >
      <div v-if="notiTableData.order && (notiTableData.order.clientState === 'CONFIRMED' || notiTableData.order.clientState === 'BILLING')" class="w-full flex justify-center items-center">ชำระเงิน</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobal, closeSideBar } from "@/providers/global";
import BaseToggleMenu from "../Base/BaseToggleMenu.vue";
import { useAuth } from "@/providers/auth";
import { orderedFoodPrice, notiTableData } from "@/composable/menu-state";

// console.log(!(modalMenuSelect && modalMenuBasket));
</script>

<style scoped></style>
