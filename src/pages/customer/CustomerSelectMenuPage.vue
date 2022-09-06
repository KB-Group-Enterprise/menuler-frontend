<template>
  <LayoutContainer>
    <div class="bg-gray-100 max-w-2xl w-full h-full min-h-screen">
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
        class="transition-all fixed w-full max-w-md bottom-0"
        :class="!(modalMenuSelect || modalMenuBasket) ? 'translate-y-[0%]' : 'translate-y-[100%]'"
      >
        <MenuBottombar @click="basketMenu" />
      </div>
      <h1 class="ml-2 text-2xl font-bold text-main w-full text-center pt-2">MENULER</h1>
      <p
        class="ml-2 text-xs font-bold text-main w-full text-center -mt-1 uppercase tracking-[0.3rem]"
      >
        the smart menu
      </p>
      <div class="mt-4" v-for="(topic, index) in 1" :key="index">
        <div class="pl-4 text-xl">Topic</div>
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
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { computed, reactive, readonly, watch, ref } from 'vue';
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import MenuBottombar from '@/components/Menu/MenuBottombar.vue';
import MenuBasket from '@/components/Menu/MenuBasket.vue';
import MenuSelector from '@/components/Menu/MenuSelector.vue';
import {
  modalMenuSelect,
  modalMenuBasket,
  menuItem,
  menuList,
  tableToken,
  restaurantToken,
  tableId,
  username,
  menuBasket,
  selectedFoodList,
  userId
} from '@/composable/menu-state';
import { useRoute } from 'vue-router';
import { useEapi } from '@/providers';
import { useSocketIO } from '@/composable/socket';
import { POSITION, useToast } from 'vue-toastification';
const { socket } = useSocketIO();
const toast = useToast();

username.value = 'test';

socket.on('connect', () => {
  console.log('socket.io connected');
  const tableToken = route.params.token;
  socket.emit('joinTable', {
        username: username.value,
        tableToken: tableToken,
  })
});

socket.on('joinedTable', (data) => {
    // console.log('joinedTable: ', data)
    // userId.value = data.userId;
    toast.success(`${username.value} joins the table`);
})

socket.on('deselectedFood', (data) => {
    console.log('deselectedFood', data)
})

socket.on('noti-table', (data) => {
    console.log('noti-table: ', data)
    menuBasket.value = data.selectedFoodList.map((i: any) => i.menuId);
    selectedFoodList.value = data.selectedFoodList;
    // toast.success(data.message, { position: POSITION.BOTTOM_CENTER });
})

socket.on('selectedFood', (data) => {
    console.log('food selected', data)
    // toast.success(data.message, { position: POSITION.BOTTOM_CENTER });
})


const route = useRoute();

const eapi = useEapi();

const fetchTokenData = async () => {
  const result = await eapi.menu.getRestaurantByToken(tableToken.value);
  if (result.success && result.data) {
    restaurantToken.value = result.data.restaurantId;
    tableId.value = result.data.id;
    console.log(restaurantToken.value);
  }
};

const fetchMenu = async () => {
  const result = await eapi.menu.getMenuByToken(restaurantToken.value);
  if (result.success && result.data) {
    menuList.value = result.data;
  }
};

const fetchData = async () => {
  tableToken.value = route.params.token;
  await fetchTokenData();
  await fetchMenu();
  console.log(menuList.value.menu);
};

fetchData();

const selectMenu = (item: any) => {
  modalMenuSelect.value = true;
  menuItem.value = item;
};

const basketMenu = (item: any) => {
  modalMenuBasket.value = true;
};

const item = ref<{ name: string }>({ name: 'kb' });
</script>
