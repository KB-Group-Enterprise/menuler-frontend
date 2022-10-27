<template>
  <div
    class="w-full overflow-y-auto h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20 pb-4"
  >
    <div class="absolute right-2 text-2xl" @click="close">x</div>
    <div class="w-full">
      <div class="text-2xl text-center my-4">ตระกร้าสินค้า</div>
      <div class="px-12">
        <hr />
      </div>
      <div class="รอแก้บัค overflow">
      <div class="grid grid-cols-3" v-for="(item, index) in selectedFoodList" :key="index">
        <!-- {{ item.menuId }}
        {{ findMenuById(item.menuId).imageUrl }}
        {{findMenuById(item.menuId).price}} -->
        <div class="w-full h-full">
          <div class="flex justify-center items-center p-4">
            <div class="w-20 h-20 bg-gray-300 flex justify-center items-center">
              <img
                :src="findMenuById(item.menuId).imageUrl"
                class="w-full h-full rounded object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-full h-full flex justify-center flex-col">
          <div class="text-xs">{{ item.username }}</div>
          <div>{{ findMenuById(item.menuId).foodName }}</div>
          <div class="text-xs">{{ findMenuById(item.menuId).price }} ฿</div>
        </div>
        <div class="text-xl w-full flex justify-end items-center cursor-pointer">
          <div
            class="w-10 h-10 flex justify-center items-center rounded-full shadow mr-4"
            @click="removeMenuByIndex(item.foodOrderId)"
          >
            X
          </div>
        </div>
        <div class="col-span-3 px-8 mb-2" v-if="findOptionsByIdList(item.selectedOptions).length">
          <div class="" v-for="(option,index) in findOptionsByIdList(item.selectedOptions)" :key="option.id">
            <div class="flex justify-between w-full text-xs">
              <span>+ {{ option.name }}</span>
              <span>{{ option.price }} บาท</span>
            </div>
          </div>
        </div>
        <div class="col-span-3 px-8">
          <hr />
        </div>
      </div>
      <div class="text-center text-gray-400 my-5" v-show="!selectedFoodList.length">
        ไม่มีรายการที่เลือก
      </div>
    </div>
      <div class="flex flex-col px-4 mt-4">
        <div class="flex flex-nowrap justify-between p-4">
          <span>ราคารวม </span>
          <span class="text-yellow-500">{{ selectedFoodPrice }} บาท</span>
        </div>
        <button class="w-full bg-gray-50 py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white" :disabled="Boolean(!selectedFoodList.length)" @click="order">
          สั่งอาหาร
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, readonly, watch, ref, defineProps, onMounted, toRaw } from 'vue';
import {
  modalMenuBasket,
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
selectedFoodPrice,
findOptionsByIdList,
optionPools,
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
  modalMenuBasket.value = false;
  console.log('close');
};

const findMenuById = (id: any) => {
  // console.log(menuList.value.menu);
  return menuList.value.menu.find((x: any) => x.id === id);
};

const removeMenuByIndex = (foodOrderId: string) => {
  // console.log(foodOrderId)
  // menuBasket.value.splice(index,1)
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
    const createPayload =  {
      foodOrderList: toRaw(selectedFoodList.value),
      restaurantId: restaurantId.value,
      tableToken: tableToken.value,
      clientGroupId: clientGroupId.value,
    }
    console.log({
      createPayload
    })
    socket.emit('handleCreateOrder', createPayload);
  }
};
</script>
