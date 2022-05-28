<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
      <div class="text-center text-4xl mt-8 text-gray-600 uppercase">
          <span class="font-semibold">Menuler</span>
        </div>
        <div class="text-center text-lg my-2">เมนูอาหารดิจิตัล</div>
      <div class="flex flex-col justify-center items-center">
        <img class="w-48 h-48 my-2" src="http://api.qrserver.com/v1/create-qr-code/?data=http://13.76.222.55:3000/customer/menu/a507aac6-3939-42e4-b3b0-1a6a984d18b0!&size=400x400" />
        for our demo <router-link to="/customer/menu/a507aac6-3939-42e4-b3b0-1a6a984d18b0" class="text-blue-500 underline">click here</router-link>
      </div>
  </div>
</template>

<script setup lang="ts">
import LayoutContainer from "@/components/Layout/LayoutContainer.vue";
</script>
