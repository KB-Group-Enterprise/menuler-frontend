<template>
  <div
    class="w-full min-h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20"
  >
    <div class="absolute right-2 text-2xl" @click="close">x</div>
    <div class="w-full" v-if="notiTableData.order">
      <div class="text-2xl text-center my-4">Order</div>
      <div class="px-12">
        <hr />
      </div>
      <div class="grid grid-cols-3" v-for="(item, index) in notiTableData.order.foodOrderList" :key="index">
        <!-- {{ item.menuId }}
        {{ findMenuById(item.menuId).imageUrl }}
        {{findMenuById(item.menuId).price}} -->
        <div class="w-full h-full">
          <div class="flex justify-center items-center p-4">
            <div class="w-20 h-20 bg-gray-300 flex justify-center items-center">
              <img
                :src="item.imageUrl"
                class="w-full h-full rounded object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-full h-full flex justify-center flex-col">
          <div>{{ item.foodName }}</div>
          <div class="text-xs">{{ item.price }} ฿</div>
        </div>
        <div class="col-span-3 px-8">
          <hr />
        </div>
      </div>
    </div>
    <div v-else>
       <div class="text-2xl text-center my-4">No order yet</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, readonly, watch, ref, defineProps, onMounted, toRaw } from 'vue';
import {
  modalMenuOrder,
  menuItem,
  menuCount,
  menuBasket,
  menuList,
  tableToken,
  restaurantToken,
  tableId,
  selectedFoodList,
  username,
  userId,
  restaurantId,
  clientGroupId,
  notiTableData,
} from '@/composable/menu-state';
import { useEapi } from '@/providers';
import { useSocketIO } from '@/composable/socket';
import { string } from 'yup';
import { useToast } from 'vue-toastification';
import { Swaler } from '@/utils/helper/swaler';
const { socket } = useSocketIO();

const eapi = useEapi();
const toast = useToast();

const close = () => {
  modalMenuOrder.value = false;
  console.log('close');
};

const findMenuById = (id: any) => {
  // console.log(menuList.value.menu);
  return menuList.value.menu.find((x: any) => x.id === id);
};

const removeMenuByIndex = (foodOrderId: string) => {
  // console.log(foodOrderId)
  // menuOrder.value.splice(index,1)
  console.log({
    userId: userId.value,
    username: username.value,
    tableToken: tableToken.value,
    foodOrderId: foodOrderId,
  });
  socket.emit('deselectFood', {
    userId: userId.value,
    username: username.value,
    tableToken: tableToken.value,
    foodOrderId: foodOrderId,
  });
};

const order = async () => {
  // if already ordered this food
    if (!selectedFoodList.value.length) {
        toast.warning('กรุณาเลือกรายการอาหารก่อน')
    }

  if (notiTableData.value.order) {
    // if (notiTableData.value.order.status === 'NOT_CHECKOUT') {
    //     Swaler.warn('รออเดอร์ก่อนหน้าเช็คเอ๊าก่อน')
    // }
    console.log('socket.handleUpdateOrder',{
      orderId: notiTableData.value.order.id,
      additionalFoodOrderList: selectedFoodList.value,
      restaurantId: restaurantId.value,
      tableToken: tableToken.value,
      clientGroupId: clientGroupId.value,
    })
    socket.emit('handleUpdateOrder', {
      orderId: notiTableData.value.order.id,
      additionalFoodOrderList: selectedFoodList.value,
      restaurantId: restaurantId.value,
      tableToken: tableToken.value,
      clientGroupId: clientGroupId.value,
    });
  } else {
    socket.emit('handleCreateOrder', {
      additionalFoodOrderList: selectedFoodList.value,
      restaurantId: restaurantId.value,
      tableToken: tableToken.value,
      clientGroupId: clientGroupId.value,
    });
  }
};
</script>
