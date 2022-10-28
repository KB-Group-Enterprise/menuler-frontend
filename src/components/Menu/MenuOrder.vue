<template>
  <div
    class="w-full overflow-y-auto h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20 pb-28"
  >
  <div class="absolute left-5 top-5 text-2xl" @click="close">
      <IconifyIcon icon="ep:back" class="mx-1"/>
    </div>
    <div class="w-full" v-if="notiTableData.order">
      <div class="text-2xl text-center my-4">รายการที่สั่ง</div>
      <div class="text-center my-4">{{ notiTableData.order.clientState }}</div>
      <div class="px-12">
        <hr />
      </div>
      <div class="grid grid-cols-8 px-4" v-for="(item, index) in notiTableData.order.foodOrderList" :key="index">
        <!-- {{ item.menuId }}
        {{ findMenuById(item.menuId).imageUrl }}
        {{findMenuById(item.menuId).price}} -->
        <div class="w-full h-full col-span-3 relative">
          <div class="flex justify-center items-center p-2">
            <div class="w-20 h-20 bg-gray-300 flex justify-center items-center overflow-hidden rounded-md relative">
              <img
                :src="item.menu.imageUrl"
                class="w-full h-full rounded object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-full h-full flex justify-center flex-col col-span-5 relative">
          <div class="absolute right-2 top-4 py-1 text-xs px-2 rounded-md text-center text-white" :class="getStatus(item.status) == 'กำลังปรุง' ? 'bg-orange-500' : getStatus(item.status) == 'เสิร์ฟแล้ว' ? 'bg-green-500' : 'bg-gray-500'">{{getStatus(item.status)}}</div>
        <div class="text-xs">
          <div v-for="clientId in item.clientId" :key="clientId">
            <div v-if="findUserByUserId(clientId)">
              <span class="text-xs">{{ findUserByUserId(clientId).username }}</span>
            </div>
          </div>
        </div>
          <div>{{ item.menu.foodName }}</div>
          <div class="text-xs">{{ item.menu.price }} ฿</div>
        </div>
        <div class="col-span-8 px-8 mb-2" v-if="findOptionsByIdList(item.optionIds).length">
          <div class="" v-for="(option,index) in findOptionsByIdList(item.optionIds)" :key="option.id">
            <div class="flex justify-between w-full text-xs">
              <span>+ {{ option.name }}</span>
              <span>{{ option.price }} บาท</span>
            </div>
          </div>
        </div>
        <div class="col-span-8 px-8">
          <hr />
        </div>
      </div>
    </div>
    <div v-else>
       <div class="text-2xl text-center my-4">ไม่พบออเดอร์</div>
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
findUserByUserId,
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
  modalMenuOrder.value = false;
  console.log('close');
};

const findMenuById = (id: any) => {
  // console.log(menuList.value.menu);
  return menuList.value.menu.find((x: any) => x.id === id);
};

const getStatus = (status : any) => {
  let statusTH = ''
  if(status === 'COOKING') statusTH = 'กำลังปรุง'
  else if(status === 'SERVED') statusTH = 'เสิร์ฟแล้ว'
  else if(status === 'CANCEL') statusTH = 'ยกเลิก'
  else if(status === 'PENDING') statusTH = 'กำลังปรุง'
  return statusTH
}

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
