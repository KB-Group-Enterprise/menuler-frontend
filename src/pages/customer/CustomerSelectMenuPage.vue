<template>
  <LayoutContainer>
    <BaseLoading v-if="isApiLoading" />
    <div
      v-else-if="isSocketLoading"
      class="bg-gray-100 max-w-2xl w-full h-full min-h-screen flex flex-col justify-center"
    >
      <div class="form-group mb-6 mx-4 my-12">
        <div class="my-2 w-full text-center">ยันดีต้อนรับสู่</div>
        <div v-if="restaurantData" class="my-2 w-full text-center text-2xl font-bold">
          {{ restaurantData.restaurant.restaurantName }}
        </div>
        <div
          v-if="restaurantData && restaurantData.restaurant.restaurantImage[0]"
          class="w-full flex justify-center"
        >
          <img :src="restaurantData.restaurant.restaurantImage[0]" />
        </div>
        <!-- <Vue3Lottie :animationData="LoadingLottie" :height="180" :width="180" /> -->
        <div class="my-2 w-full text-center">กรุนากรอกชื่อ</div>
        <input
          type="text"
          v-model="name"
          @keyup.enter="connectTable"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleInput7"
          placeholder="Name"
        />
        <BaseButtomTW class="w-full my-2" type="submit" @click="connectTable"
          >สั่งอาหาร</BaseButtomTW
        >
      </div>
    </div>
    <BaseLoading v-else-if="isLoading" />
    <div v-else class="bg-gray-100 max-w-2xl w-full h-full min-h-screen">
      <div
        class="fixed w-full max-w-md transition-all duration-500 mx-auto"
        :class="modalMenuSelect ? ' translate-y-[0%] ' : ' translate-y-[100%] '"
      >
        <menu-selector :item="item" class="w-full" />
      </div>
      <div
        class="fixed w-full max-w-md transition-all duration-500 mx-auto"
        :class="
          modalMenuBasket ? ' translate-x-[0%] opacity-100' : ' translate-x-[100%]  opacity-0'
        "
      >
        <menu-basket :item="item" class="w-full" />
      </div>
      <div
        class="fixed w-full max-w-md transition-all duration-500 mx-auto"
        :class="modalMenuOrder ? ' translate-x-[0%] opacity-100' : ' translate-x-[100%]  opacity-0'"
      >
        <menu-order :item="item" class="w-full" />
      </div>
      <div
        class="fixed w-full max-w-md transition-all duration-500 mx-auto"
        :class="
          modalCheckout ? ' translate-x-[0%] opacity-100' : ' translate-x-[100%]  opacity-0'
        "
      >
        <MenuCheckout :item="item" class="w-full" />
      </div>
      <div
        class="transition-all fixed w-full max-w-md bottom-0"
        :class="
          !(modalMenuSelect || modalMenuBasket || modalMenuOrder)
            ? 'translate-y-[0%]'
            : 'translate-y-[100%]'
        "
      >
        <MenuBottombar @click="basketMenu" />
      </div>
      <div
        class="transition-all  fixed w-full max-w-md bottom-0"
        :class="modalMenuOrder && !modalCheckout ? 'translate-y-[0%] duration-500' : 'translate-y-[100%]'"
      >
        <MenuCheckoutBottombar @click="checkout" />
      </div>
      <div class="transition-all fixed w-full max-w-md bg-white shadow-sm pb-2" :class="!(modalMenuSelect || modalMenuBasket || modalMenuOrder) ? 'translate-y-[0%]' : 'translate-y-[-100%]'
        ">
        <div class="flex flex-col justify-center">
          <h1 class="text-2xl font-bold text-main w-full text-center pt-1">MENULER</h1>
          <p
            class="text-xs font-bold text-main w-full text-center -mt-1 uppercase tracking-[0.3rem]"
          >
            the smart menu
          </p>
        </div>
        <!-- Button trigger modal -->
        <div 
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          class="absolute left-4 top-3" 
          @click="showUsers">
          <IconifyIcon icon="clarity:users-solid" class="text-3xl" />
        </div>
        <div class="absolute right-4 top-3" @click="orderMenu">
          <IconifyIcon icon="ep:dish-dot" class="text-3xl" />
          <div class="top-5 right-2 absolute w-4 h-4" v-if="notiTableData.order">
            <div
              class="absolute inline-block top-2 -right-1 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 w-5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full z-10"
            >
              {{ notiTableData.order.foodOrderList.length }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16" v-for="(topic, index) in 1" :key="index">
        <!-- <div class="pl-4 text-xl">Topic</div> -->
        <div class="grid grid-cols-2 gap-4 mt-2 px-4">
          <div
            v-for="(item, index) in menuList.menu"
            :key="index"
            class="flex flex-col w-full items-center"
            @click="selectMenu(item)"
          >
            <div class="flex flex-col w-full">
              <div class="w-full h-48 rounded bg-gray-300 overflow-hidden">
                <img :src="item.imageUrl" class="w-full h-full rounded object-cover" />
              </div>
              <div>{{ item.foodName }}</div>
              <div class="text-xs">{{ item.price }} ฿</div>
            </div>
          </div>
        </div>
        <div class="px-10">
          <hr class="mt-2" />
        </div>
      </div>
      <!-- <div class="text-red-500" @click="leaveTable">ออกจากโต๊ะ</div> -->
              <!-- Modal -->
              <div
              class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog relative w-auto pointer-events-none">
                <div
                  class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
                >
                  <div
                    class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
                  >
                    <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                      เพื่อนร่วมโต๊ะ
                    </h5>
                    <button
                      type="button"
                      class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body relative p-4">
                    <div>
                      <div v-for="user in users" :key="user.id" class="flex flex-nowrap items-center space-x-2 p-3 border border-l-0 border-r-0">
                        <div class="w-10 h-10 p-0.5 rounded-full" :class="[ user.status === 'ONLINE' ? 'bg-green-400' : 'bg-gray-400']">
                          <img class="rounded-full" src="https://static.vecteezy.com/system/resources/previews/000/964/198/large_2x/fast-food-meal-set-vector.jpg" />
                        </div>
                        <div>
                          <span class="font-bold">{{ user.username }}</span>
                          <!-- <span class="mx-2 text-sm">{{ user.status.toLowerCase() }}</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
                  >
                    <button
                      type="button"
                      class="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                    >
                      ปิด
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end modal -->
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { computed, reactive, readonly, watch, ref } from 'vue';
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import MenuBottombar from '@/components/Menu/MenuBottombar.vue';
import MenuBasket from '@/components/Menu/MenuBasket.vue';
import MenuSelector from '@/components/Menu/MenuSelector.vue';
import MenuOrder from '@/components/Menu/MenuOrder.vue';
import MenuCheckoutBottombar from '@/components/Menu/MenuCheckoutBottombar.vue';
import MenuCheckout from '@/components/Menu/MenuCheckout.vue';
import {
  modalMenuSelect,
  modalMenuBasket,
  modalCheckout,
  modalMenuOrder,
  menuItem,
  menuList,
  tableToken,
  restaurantToken,
  tableId,
  username,
  menuBasket,
  selectedFoodList,
  userId,
  clientGroupId,
  restaurantId,
  notiTableData,
} from '@/composable/menu-state';
import { useRoute } from 'vue-router';
import { useEapi } from '@/providers';
import { useSocketIO } from '@/composable/socket';
import { POSITION, useToast } from 'vue-toastification';
import BaseLoading from '@/components/Base/BaseLoading.vue';
import router from '@/router';
import Swal from 'sweetalert2';
import BaseButtomTW from '@/components/Base/BaseButtomTW.vue';
import { Vue3Lottie } from 'vue3-lottie';
import LoadingLottie from '@/assets/lottie/loading.json';
import { getCookie, setCookie } from '@/utils/helper/cookieHelper';
const { socket } = useSocketIO();
const toast = useToast();

// const name = prompt('plz enter name');

const name = ref('');

const isApiLoading = ref(true);
const isSocketLoading = ref(true);

const isLoading = computed(() => {
  return isApiLoading.value || isSocketLoading.value;
});

socket.on('connect', () => {
  console.log('socket.io connected');
  const tableToken = route.params.token;
});

const users = computed(() => {
  if (!notiTableData.value.usernameInRoom) return []
  const users = notiTableData.value.usernameInRoom.sort((a: any, b: any) => {
    const x = a.status === 'ONLINE';
    const y = b.status === 'ONLINE';
    return (x === y)? 0 : x? -1 : 1;
  });
  // console.log(users.map((i: any) => i.status))
  return  users
})

const connectTable = () => {
  username.value = name.value || 'test';

  console.log(
    {
      username: username.value,
      tableToken: tableToken.value,
    },
    'connected'
  );

  socket.emit('joinTable', {
    username: username.value,
    tableToken: tableToken.value,
  });
};

socket.on('joinedTable', (data) => {
  console.log('joinedTable: ', data);
  setCookie('username', data.username, 60 * 10);
  setCookie('userId', data.userId, 60 * 10);
  // userId.value = data.userId;
});

socket.on('deselectedFood', (data) => {
  console.log('deselectedFood', data);
});

const lastestMassage = ref('');

socket.on('noti-table', (data) => {
  console.log('noti-table: ', data);
  menuBasket.value = data.selectedFoodList.map((i: any) => i.menuId);
  selectedFoodList.value = data.selectedFoodList;
  clientGroupId.value = data.clientGroupId;
  notiTableData.value = data;

  const message = data.message;
  console.log({
    lastestMassage: lastestMassage.value,
    message: message,
  });
  if (data.message && lastestMassage.value !== message) {
    lastestMassage.value = message;
    toast(data.message);
  }

  isSocketLoading.value = false;
  // toast.success(data.message, { position: POSITION.BOTTOM_CENTER });
});

socket.on('selectedFood', (data) => {
  console.log('food selected', data);
  // toast.success(data.message, { position: POSITION.BOTTOM_CENTER });
});

const leaveTable = () => {
  socket.emit('leaveTable', {
    username: username.value,
    tableToken: tableToken.value,
  });
};

const route = useRoute();

const eapi = useEapi();

const restaurantData = ref<any>(null);
const fetchTokenData = async () => {
  const result = await eapi.menu.getRestaurantByToken(tableToken.value);
  if (result.success && result.data) {
    restaurantToken.value = result.data.restaurantId;
    tableId.value = result.data.id;
    restaurantId.value = result.data.restaurantId;
    console.log(restaurantToken.value);
    restaurantData.value = result.data;
  }
};

const fetchMenu = async () => {
  const result = await eapi.menu.getMenuByToken(restaurantToken.value);
  if (result.success && result.data) {
    menuList.value = result.data;
  } else {
    router.push('/');
  }
};

const fetchData = async () => {
  tableToken.value = route.params.token as any as string;
  await fetchTokenData();
  await fetchMenu();
  console.log(menuList.value.menu);
  const cookieUsername = getCookie('username');
  const cookieUserId = getCookie('userId');

  console.log({
    cookieUsername,
    cookieUserId,
  });
  if (cookieUsername && cookieUserId) {
    socket.emit('joinTable', {
      username: cookieUsername,
      tableToken: tableToken.value,
      userId: cookieUserId,
    });
  }
  isApiLoading.value = false;
};

fetchData();

const selectMenu = (item: any) => {
  modalMenuSelect.value = true;
  menuItem.value = item;
};

const basketMenu = (item: any) => {
  modalMenuBasket.value = true;
};

const checkout = () => {
  modalCheckout.value = true
}

const orderMenu = (item: any) => {
  console.log('hello');

  modalMenuOrder.value = true;
};

const showUsers = () => {
  console.log(notiTableData.value.usernameInRoom);
};

const item = ref<{ name: string }>({ name: 'kb' });
</script>
