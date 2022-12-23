<template>
    <div class="h-screen w-full flex flex-col items-center justify-center overflow-hidden" id="home-bg">
      <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="text-center text-4xl text-black uppercase">
          <span class="font-semibold">Menuler</span>
        </div>
        <div class="text-center text-lg my-2 text-black">เมนูอาหารดิจิตัล</div>
        <div class="flex flex-col justify-center items-center my">
          <img
            class="w-48 h-48 p-2 border bg-white bg-opacity-50 border-b-0"
            src="http://api.qrserver.com/v1/create-qr-code/?data=https://menuler.me/customer/menu/b1e4d07a-d68b-4bdd-b8b9-65ead890feda&size=400x400"
          />
          <div class="bg-blue-600 border border-blue-600 text-white text-xs w-full text-center mb-4">ทดลองแสกน</div>
          <button
            @click="router.push('/customer/menu/b1e4d07a-d68b-4bdd-b8b9-65ead890feda')"
            class="mb-2 w-full relative px-6 py-2.5 bg-blue-600 text-white font-medium leading-normal uppercase shadow-md hover:bg-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out hover:text-black"
          >
            <span class="flex justify-center items-center space-x-2">
              <span>ทดลองใช้งาน</span>
              <IconifyIcon icon="entypo:controller-next"></IconifyIcon>
              <span class="absolute h-3 w-3 -top-2 -right-1">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style>
#home-bg {
  background-image: url("https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg");
  background-repeat: no-repeat;
  background-color: #cccccc;
  background-size: cover;
  background-position: center;
 }
</style>
