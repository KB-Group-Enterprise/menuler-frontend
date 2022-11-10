<template>
  <div class="w-full min-h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20">
    <div class="absolute left-5 top-5 text-3xl" @click="close">
      <IconifyIcon icon="ep:back" class="mx-1 bg-white rounded-full px-1"/>
    </div>
      <div class="w-full"> 
    <div class="w-full h-60 bg-gray-50 flex justify-center items-center">
        <img :src="menuItem.imageUrl" class="w-full h-full rounded object-cover" />
    </div>
    <div class="px-8 absolute w-full">
        <div class="w-full bg-white rounded-md px-4 py-2 -mt-5 shadow flex items-center justify-between">
            <span>{{menuItem.foodName}}</span>
            <span>{{ menuItem.price }} บาท</span>
        </div>
    </div>
    <div class="px-4 mt-8 flex flex-col gap-4">
        <div class="flex flex-col">
            <!-- <div>Topic</div> -->
            <div class="text-sm px-4">
                <div class="flex flex-row items-center gap-x-2" v-for="(option,index) in menuItem.options" :key="index">
                    <input type="checkbox" :checked="isMenuChecked(option.id)" @change="selectOption(option)" />
                    <div class="flex flex-nowrap justify-between w-full"><span>{{ option.name }}</span> <span>{{ option.price }} บาท</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-row justify-center gap-x-4 mt-4">
        <div class="w-10 h-10 rounded-full shadow bg-white flex justify-center items-center text-2xl" @click="menuCount--">-</div>
        <div class="w-10 h-10 flex justify-center items-center text-2xl">{{menuCount}}</div>
        <div class="w-10 h-10 rounded-full shadow bg-white flex justify-center items-center text-2xl" @click="menuCount++">+</div>
    </div>
    <div class="flex flex-nowrap justify-between p-4 pb-0">
      <span>ราคารวม </span>
      <span class="text-main"><span class="font-medium">{{ foodPrice }}</span> บาท</span>
    </div>
    <div class="px-4 mt-2">
        <div class="w-full bg-gray-50 py-2 rounded-md shadow text-center" @click="addMenu">เพิ่ม</div>
    </div>
    </div>
    
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, readonly, watch, ref, defineProps, onMounted, toRaw } from 'vue';
import { modalMenuSelect,menuItem,menuCount,menuBasket, username, tableToken, userId } from '@/composable/menu-state';
import { useSocketIO } from '@/composable/socket';
const { socket } = useSocketIO();

const selectedOptions = ref<Set<string>>(new Set());

const foodPrice = computed(() => {
 let price = menuItem.value.price;
 if (selectedOptions.value.size) {
    selectedOptions.value.forEach(optionId => {
        const option = menuItem.value.options.find(i => i.id === optionId);
        if (option) {
            price += option.price
        }
    })
 }
 price = price * menuCount.value;
 return price;
})


const isMenuChecked = (optionId: string) => {
    return selectedOptions.value.has(optionId)
}

const selectOption = (option: any) => {
    if (selectedOptions.value.has(option.id)) {
        selectedOptions.value.delete(option.id)
    } else {
        selectedOptions.value.add(option.id);
    }
}

const close = () => {
    modalMenuSelect.value = false;
    selectedOptions.value = new Set();
    // console.log('close');
    menuCount.value = 1
}

const addMenu = () => {
    console.log(toRaw(menuItem.value))
    const item = {
            userId: userId.value,
            username: username.value,
            tableToken: tableToken.value,
            selectedFood: [] as any[]
        }
    for (let index = 0; index < menuCount.value; index++) {
        item.selectedFood.push({
                menuId: menuItem.value.id,
                foodName: menuItem.value.foodName,
                selectedOptions: [...selectedOptions.value],
                username: item.username,
                userId: item.userId,
            })
    }
    console.log('selectFood', item);
    socket.emit('selectFood', item);
    close()
}
</script>
