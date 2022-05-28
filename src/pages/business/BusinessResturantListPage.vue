<template>
  <BaseContainer>
    <Transition name="component-fade" type="transition">
      <BaseLoading v-if="isLoading" />
      <div v-else class="flex flex-col justify-center">
        <div class="text-center text-2xl mt-8 text-gray-600 uppercase">
          <span class="font-semibold text-bl">Menuler</span>
          Business
        </div>
        <div class="text-center text-lg my-2">ร้านอาหาร</div>
        <div class="mx-4 space-y-2">
          <div v-for="item in resturantList" :key="item.id">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
                <span :class="[item.isActivate ? 'text-green-400' : 'text-gray-400']">
                    {{ item.status === 'OPEN' ? 'เปิด' : 'ปิด' }}
                </span> 
                {{ item.restaurantName }}
              </h5>
              <hr />
              <p class="text-gray-700 text-base mb-4">
                สร้างเมื่อ {{ formatDateLocale(item.registerOn) }}
              </p>
              <div class="flex space-x-2">
              <BaseButtomTW>
                จัดการเมนู
              </BaseButtomTW>
              <BaseButtomTW>
                จัดการโต๊ะ
              </BaseButtomTW>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue';
import { useEapi } from '@/providers';
import { RestaurantListItem } from '@/types/dto.types';
import formatDateLocale from '@/utils/helper/formatDateLocale';
import { sleeper } from '@/utils/helper/sleeper';
import { ref } from '@vue/runtime-dom';
import BaseButtomTW from '@/components/Base/BaseButtomTW.vue';
const isLoading = ref(true);
const eapi = useEapi();
const resturantList = ref<RestaurantListItem[]>([]);

const fetchMenu = async () => {
  isLoading.value = true;
  const result = await eapi.business.getResturant();
  //   await sleeper(1000);
  isLoading.value = false;
  //   console.log(JSON.stringify(result.data));
  if (result.success && result.data) {
    resturantList.value = result.data.restaurantList;
  }
};

fetchMenu();
</script>

<style scoped></style>
