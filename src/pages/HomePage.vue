<template>
  <LayoutContainer>
    <div class="text-center text-4xl mt-8 text-gray-600 uppercase">
      <span class="font-semibold">Menuler</span>
    </div>
    <div class="text-center text-lg my-2">เมนูอาหารดิจิตัล</div>
    <div class="flex flex-col justify-center items-center">
      <img
        class="w-48 h-48 my-2"
        src="http://api.qrserver.com/v1/create-qr-code/?data=http://13.76.222.55:3000/customer/menu/3f861ea3-54d2-48da-a0d9-c8a9686f05d6!&size=400x400"
      />
      for our demo
      <router-link
        to="/customer/menu/3f861ea3-54d2-48da-a0d9-c8a9686f05d6"
        class="text-blue-500 underline"
        >click here</router-link
      >
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
</script>
