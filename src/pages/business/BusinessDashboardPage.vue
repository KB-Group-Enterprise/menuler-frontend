<template>
  <BaseContainer>
    <Transition name="component-fade" type="transition">
      <BaseLoading v-if="isLoading" />
      <div v-else class="flex flex-col justify-center items-center">
        <BusinessHeader />
        <div class="text-center text-lg my-2">ร้านอาหาร</div>
        <div class="w-11/12 space-y-2">
          <div v-if="restaurant" class="p-6 rounded-lg shadow-lg bg-white w-full">
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
            <div
              class="font-bold text-sm space-x-2 justify-center rounded text-center p-1 my-2 flex"
            >
              <div :class="[restaurant.status === 'OPEN' ? 'bg-green-400' : 'bg-gray-400']" class="w-5 h-5 rounded-full"></div>  
              <div>{{ restaurant.status === 'OPEN' ? 'เปิดให้บริการ' : 'ปิดให้บริการ' }}</div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <BaseButtomTW @click="router.push('/business/menu')"> จัดการเมนู </BaseButtomTW>
              <BaseButtomTW color="secondary" @click="router.push('/business/table')"> จัดการโต๊ะ </BaseButtomTW>
              <BaseButtomTW
                @click="router.push('/business/edit')"
                color="warning"
              >
                แก้ไขร้าน
              </BaseButtomTW>
              <BaseButtomTW
                @click="router.push('/business/summary')"
                color="info"
                >
                ดูสรุปผล
              </BaseButtomTW>
              <BaseButtomTW
                @click="logout"
                color="danger"
                >
                ออกจากระบบ
              </BaseButtomTW>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <BaseLoading />
          </div>
        </div>
        <div class="w-11/12 flex flex-col items-center mt-4">
          <h1 class="text-center text-xl">รายการสั่งอาหาร</h1>
          <div v-for="order in orders" :key="order.id" class="w-full bg-white rounded w-full p-2 my-2 shadow-md">
            <div>
              <div class="font-bold" v-if="order.table">โต๊ะ {{ order.table.tableName }}</div>
              <div class="flex justify-between">
                <span>{{ formatDateLocale(order.createAt) }}</span>
                <span class="font-bold">{{ order.clientState }}</span>
              </div>
              <div class="flex flex-nowrap justify-end space-x-2 my-2">
                <div v-show="order.clientState === 'BILLING' && order.status === 'BILLING'" class="w-full flex-nowrap flex justify-between">
                  <BaseButtomTW color="danger" @click="updateBillStatus(order,'CANCEL')">ยกเลิกจ่าย</BaseButtomTW>
                  <BaseButtomTW color="warning" @click="updateBillStatus(order, 'PAID')">จ่ายสำเร็จ</BaseButtomTW>
                </div>
                <BaseButtomTW v-show="order.clientState === 'BILLING' && order.status !== 'BILLING'" color="warning" @click="confirmBill(order)">ยืนยันการออกบิล</BaseButtomTW>
                <BaseButtomTW v-show="order.clientState !== 'REJECT' && order.clientState !== 'BILLING'" color="danger" @click="cancelOrder(order)">ยกเลิกออเดอร์</BaseButtomTW>
                <BaseButtomTW 
                  v-show="order.clientState === 'PENDING' || order.clientState === 'UPDATE_ORDER'" 
                  color="success"
                  @click="confirmOrder(order)"
                  >ยืนยันออเดอร์</BaseButtomTW>
              </div>
              <!-- <div class="w-full text-center mt-2 text-blue-400 cursor-pointer" @click="order.open = !order.open">{{ !order.open ? 'ดูเพิ่มเติม' : 'ดูน้อยลง' }}</div> -->
              <div v-if="order.open || true" class="w-full flex flex-col">
                <div v-for="food,index in order.foodOrderList" :key="food.id" class="w-full border-2 rounded p-1 px-2 my-1 fade-in">
                  <div class="flex justify-between flex-nowrap">
                    <span class="">{{ index + 1 }}. {{ food.menu.foodName }}</span>
                    <span class="font-bold">{{ food.status }}</span>
                  </div>
                  <hr class="my-2" />
                  <div v-show="order.clientState !== 'PENDING' && order.clientState !== 'REJECT'" class="flex justify-end space-x-2">
                    <!-- <BaseButtomTW 
                      v-show="!(food.status === 'COOKING' || food.status === 'SERVED')" 
                      color="warning" 
                      @click="updateFoodStatus(order, food.id, 'COOKING')"
                    > กำลังปรุง </BaseButtomTW> -->
                    <BaseButtomTW 
                      v-show="food.status !== 'SERVED'" 
                      color="success"
                      @click="updateFoodStatus(order, food.id, 'SERVED')"
                    > ยืนยันการเซิร์ฟ </BaseButtomTW>
                  </div>
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
import { RestaurantListItem, UpdateClientOrderDto } from '@/types/dto.types';
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
import { string } from 'yup';
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

const logout = () => {
  auth.logout();
  router.push('/business/login');
}

const confirmOrder = async (order: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    clientState: 'CONFIRMED'
  }
  console.log(dto)
  socket.emit('updateClientOrder', dto);
}

const cancelOrder = async (order: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    status: 'CANCEL',
  }
  console.log(dto)
  socket.emit('updateClientOrder', dto);
}

const updateFoodStatus = async (order: any, foodId: string, status: 'SERVED' | 'COOKING') => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    updateFoodOrderList: [{
      foodOrderId: foodId,
      status
    }]
  }
  console.log(dto)
  socket.emit('updateClientOrder', dto);
}

const confirmBill = async (order: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    status: 'BILLING'
  }
  console.log('confirmBillCreation',dto)
  socket.emit('updateClientOrder', dto);

}

const updateBillStatus = async (order: any, status: string) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    bill: {
      billId: order.bill.id,
      status: status
    },
  }
  console.log('updateBillStatus',dto)
  socket.emit('updateClientOrder', dto);

}

fetchResturant();
// fetchMenu();
</script>





<style scoped></style>
