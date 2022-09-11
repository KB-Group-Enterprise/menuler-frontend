<template>
  <LayoutContainer>
    <BaseLoading v-if="isApiLoading" />
    <div v-else-if="isSocketLoading" class="bg-gray-100 max-w-2xl w-full h-full min-h-screen">
      <div class="form-group mb-6 mx-4 my-12">
        <div class="my-2 w-full text-center">Please enter your name</div>
          <input type="text" 
          v-model="name"
          @keyup.enter="connectTable"
          class="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
            placeholder="Name">
            <button type="submit" class="
            my-4
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" @click="connectTable">Send</button>
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
      <div class="text-red-500" @click="leaveTable">ออกจากโต๊ะ</div>
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
  userId,
clientGroupId,
restaurantId,
notiTableData
} from '@/composable/menu-state';
import { useRoute } from 'vue-router';
import { useEapi } from '@/providers';
import { useSocketIO } from '@/composable/socket';
import { POSITION, useToast } from 'vue-toastification';
import BaseLoading from '@/components/Base/BaseLoading.vue';
import router from '@/router';
const { socket } = useSocketIO();
const toast = useToast();

// const name = prompt('plz enter name');

const name = ref('')

const isApiLoading = ref(true);
const isSocketLoading = ref(true);

const isLoading = computed(() => {
  return isApiLoading.value || isSocketLoading.value
})

socket.on('connect', () => {
  console.log('socket.io connected');
  const tableToken = route.params.token;
});

const connectTable = () => {
  username.value = name.value || 'test';
  console.log({
        username: username.value,
        tableToken: tableToken.value,
  },'connected');
  
  socket.emit('joinTable', {
        username: username.value,
        tableToken: tableToken.value,
  })
}

socket.on('joinedTable', (data) => {
    // console.log('joinedTable: ', data)
    // userId.value = data.userId;
})

socket.on('deselectedFood', (data) => {
    console.log('deselectedFood', data)
})

const lastestMassage = ref('');

socket.on('noti-table', (data) => {
    console.log('noti-table: ', data)
    menuBasket.value = data.selectedFoodList.map((i: any) => i.menuId);
    selectedFoodList.value = data.selectedFoodList;
    clientGroupId.value = data.clientGroupId;
    notiTableData.value = data;
    
    const message = data.message
    console.log({
      lastestMassage: lastestMassage.value,
      message: message
    })
    if (data.message && lastestMassage.value !== message) {
      lastestMassage.value = message
      toast(data.message)
    }

    isSocketLoading.value = false;
    // toast.success(data.message, { position: POSITION.BOTTOM_CENTER });
})

socket.on('selectedFood', (data) => {
    console.log('food selected', data)
    // toast.success(data.message, { position: POSITION.BOTTOM_CENTER });
})

const leaveTable = () => {
  socket.emit('leaveTable', {
    username: username.value,
    tableToken: tableToken.value
  })
}


const route = useRoute();

const eapi = useEapi();

const fetchTokenData = async () => {
  const result = await eapi.menu.getRestaurantByToken(tableToken.value);
  if (result.success && result.data) {
    restaurantToken.value = result.data.restaurantId;
    tableId.value = result.data.id;
    restaurantId.value = result.data.restaurantId;
    console.log(restaurantToken.value);
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
  isApiLoading.value = false
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
