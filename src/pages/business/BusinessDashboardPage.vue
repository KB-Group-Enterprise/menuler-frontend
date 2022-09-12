<template>
  <BaseContainer>
    <Transition name="component-fade" type="transition">
      <BaseLoading v-if="isLoading" />
      <div v-else class="flex flex-col justify-center items-center">
        <BusinessHeader />
        <div class="text-center text-lg my-2">ร้านอาหาร</div>
        <div class="mx-4 space-y-2">
          <div v-if="restaurant" class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <div
              class="border p-2 mb-4 transition hover:border-2 cursor-pointer flex justify-center"
            >
              <div v-if="restaurant.restaurantImage && restaurant.restaurantImage[0]">
                <img :src="restaurant.restaurantImage[0]" class="object-cover" />
              </div>
              <div v-else>
                <img
                  src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                  alt="placeholder"
                />
              </div>
            </div>
            <h5 class="text-gray-900 text-center text-xl leading-tight font-medium mb-2">
              {{ restaurant.restaurantName }}
            </h5>
            <span
              :class="[restaurant.status === 'OPEN' ? 'text-green-400' : 'text-gray-400']"
              class="font-bold"
            >
              {{ restaurant.status === 'OPEN' ? 'เปิด' : 'ปิด' }}
            </span>
            <p class="text-gray-700 text-base mb-4">
              สร้างเมื่อ {{ formatDateLocale(restaurant.registerOn) }}
            </p>
            <div class="grid grid-cols-2 gap-2">
              <BaseButtomTW @click="router.push('/business/menu')"> จัดการเมนู </BaseButtomTW>
              <BaseButtomTW @click="router.push('/business/table')"> จัดการโต๊ะ </BaseButtomTW>
              <button
                @click="router.push('/business/edit')"
                type="button"
                class="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                แก้ไขร้าน
              </button>
              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <BaseLoading />
          </div>
        </div>
        <div class="w-11/12 flex flex-col items-center mt-4">
          <h1 class="text-center text-xl">รายการสั่งอาหาร</h1>
          <div v-for="order in orders" :key="order.id" class="w-ful bg-white rounded w-full p-2 my-2 shadow-md">
            <div>
              <div class="font-bold" v-if="order.table">โต๊ะ {{ order.table.tableName }}</div>
              <div class="flex justify-between">
                <span>{{ formatDateLocale(order.createAt) }}</span>
                <span class="font-bold">{{ order.status }}</span>
              </div>
              <div class="w-full text-center mt-2 text-blue-400" @click="order.open = !order.open">{{ !order.open ? 'ดูเพิ่มเติม' : 'ดูน้อยลง' }}</div>
              <div v-if="order.open" class="w-full flex flex-col">
                <div v-for="food,index in order.foodOrderList" :key="food.id" class="w-full border-2 rounded p-1 px-2 my-1 fade-in">
                  <span class="">{{ index + 1 }}. {{ food.foodName }}</span>
                </div>
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
import { computed, ref } from '@vue/runtime-dom';
import BaseButtomTW from '@/components/Base/BaseButtomTW.vue';
import { useAuth } from '@/providers/auth';
import Swal from 'sweetalert2';
import { POSITION, useToast } from 'vue-toastification';
import { loadIcon } from '@iconify/vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import { useSocketIOWithAuth } from '@/composable/socket';
import { useRouter } from 'vue-router';
const isLoading = ref(false);
const eapi = useEapi();
const auth = useAuth();
const router = useRouter();

const profile = computed(() => auth.state.user);
// const restaurant = computed(() => profile?.value?.restaurant);
const restaurant = ref<RestaurantListItem | null>(null);
const toast = useToast();
const { socket } = useSocketIOWithAuth(auth.getToken() || '');
const orders = ref<any[]>([]);

socket.on('currentOrder', (e) => {
  console.log(e.orders);
  orders.value = e.orders.map((i: any) => {
      i.open = false;
      return i;
    });
});

socket.emit('getCurrentOrder');

const fetchResturant = async () => {
  isLoading.value = true;
  const result = await eapi.business.getResturantById(profile.value?.restaurant.id);
  //   await sleeper(1000);
  isLoading.value = false;
  //   console.log(JSON.stringify(result.data));
  if (result.success && result.data) {
    // console.log(result.data);
    restaurant.value = result.data.restaurant
  }
};

const addResturant = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'เพิ่มร้านอาหาร',
    html:
      '<div class="flex flex-col">' +
      '<label>ชื่อร้านอาหาร</label>' +
      '<input id="swal-input1" class="swal2-input">' +
      '<label class="mt-2">ที่อยู่ร้านอาหาร</label>' +
      '<input id="swal-input2" class="swal2-input">' +
      '</div>',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      return [
        (document.getElementById('swal-input1') as any).value,
        (document.getElementById('swal-input2') as any).value,
      ];
    },
  });
  if (formValues) {
    if (!formValues.every((i) => Boolean(i))) {
      toast.error('กรุณากรอกข้อมูลให้ถูกต้อง', { position: POSITION.BOTTOM_CENTER });
    }
    const name = formValues[0];
    const location = formValues[1];
    const payload = {
      restaurantName: name,
      location: location,
    };
    console.log(payload);
    const result = await eapi.business.addResturant(payload, { noticeSuccess: true });
    if (result.success) {
      auth.fetchProfile();
    }
  }
};

fetchResturant();
// fetchMenu();
</script>





<style scoped></style>
