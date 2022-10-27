<template>
  <div
    class="w-full h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20 overflow-y-auto pb-20"
  >
    <div class="absolute right-2 text-2xl" @click="close">x</div>
    <div class="w-full" v-if="notiTableData.order">
      <div class="text-2xl text-center my-4">ชำระเงิน</div>
      <div class="px-12">
        <hr />
      </div>
        <div class="px-4 py-2">
        <div class="flex w-full justify-center mb-2">รายการอาหาร</div>
        <div class="grid grid-cols-5 px-2 text-xs" v-for="(item, index) in notiTableData.order.foodOrderList" :key="index">
          <div v-for="clientId in item.clientId" :key="clientId">
          <span class="text-xs">{{ findUserByUserId(clientId).username }}</span>
          </div>
        <div class="flex w-full col-span-2">{{item.menu.foodName}}</div>
        <div class="flex w-full col-span-2 justify-end">{{item.menu.price}} บาท</div>
        <div></div>
        <div class="col-span-4 mb-2" v-if="findOptionsByIdList(item.optionIds).length">
          <div class="" v-for="(option,index) in findOptionsByIdList(item.optionIds)" :key="option.id">
            <div class="flex justify-between w-full text-xs">
              <span>+ {{ option.name }}</span>
              <span>{{ option.price }} บาท</span>
            </div>
          </div>
        </div>
        </div>
        <div class="px-8">
        <hr class="mt-2 mb-1" />
      </div>
        <div class="grid grid-cols-2 px-2 text-xs">
        <div class="flex w-full">Total</div>
        <div class="flex w-full justify-end font-bold">{{orderedFoodPrice}} <div class="font-normal ml-1">บาท</div></div>
        </div>
        </div>
        <div class="fixed bottom-0 w-full">
        <div class="mt-4 grid grid-cols-4 gap-x-2 w-full bg-white h-14 md:px-10 px-2 items-center shadow text-main ">
        <button class="w-full text-xs bg-gray-50 text-main py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white " :disabled="Boolean(!selectedFoodList.length)" @click="order">
          หารเท่ากัน
        </button>
        <button class="w-full text-xs bg-gray-50 text-main py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white" :disabled="Boolean(!selectedFoodList.length)" @click="order">
          จ่ายแยก
        </button>
        <button class="w-full bg-blue-400 text-white py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white col-span-2" :disabled="Boolean(!selectedFoodList.length)" @click="order">
          จ่ายรวม
        </button>
      </div>
    </div>
    </div>
    <div v-else>
       <div class="text-2xl text-center my-4">ยังไม่มีออเดอร์</div>
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
  modalCheckout,
  findUserByUserId,
  orderedFoodPrice,
  findOptionsByIdList,
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
  modalCheckout.value = false;
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
