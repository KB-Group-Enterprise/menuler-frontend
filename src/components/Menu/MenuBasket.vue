<template>
  <div class="w-full min-h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20">
      <div class="absolute right-2 text-2xl" @click="close">x</div>
      <div class="w-full">
      <div class="text-2xl text-center my-4">Basket</div> 
      <div class="px-12">
        <hr/>
      </div>
    <div class="grid grid-cols-3" v-for="(item,index) in menuBasket" :key="index" @click="test">
        <div class="w-full h-full">
        <div class="flex justify-center items-center p-4">
        <div class="w-20 h-20 bg-gray-300 flex justify-center items-center">
        <img :src="findMenuById(item).imageUrl" class="w-full h-full rounded object-cover" />
        </div>
        </div>
        </div>
        <div class="w-full h-full flex justify-center flex-col">
        <div>{{findMenuById(item).foodName}}</div>
        <div class="text-xs">{{findMenuById(item).price}} ฿</div>
        </div>
        <div class="text-xl w-full flex justify-end items-center"><div class="w-10 h-10 flex justify-center items-center rounded-full shadow mr-4" @click="removeMenuByIndex(index)">X</div></div>
        <div class="col-span-3 px-8">
        <hr/>
        </div>
    </div>
    <div class="px-4 mt-4">
        <div class="w-full bg-gray-50 py-2 rounded-md shadow text-center" @click="order">สั่งอาหาร</div>
    </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, readonly, watch, ref, defineProps, onMounted, toRaw } from 'vue';
import { modalMenuBasket,menuItem,menuCount,menuBasket,menuList,tableToken,restaurantToken,tableId } from '@/composable/menu-state';
import { useEapi } from '@/providers';

  const eapi = useEapi()


const close = () => {
    modalMenuBasket.value = false
    console.log('close');
}

const findMenuById = (id:any) => {
    console.log(menuList.value.menu);
    return menuList.value.menu.find( (x:any) => x.id === id)
}

const removeMenuByIndex = (index:any) => {
    menuBasket.value.splice(index,1)
}

const order = async () => {
    const raw = toRaw(menuBasket.value) 
    const newMenuBasket:any = raw.map(i => {
        return { menuId: i }
    })
    
    const payload = {
    foodOrderList: newMenuBasket,
    restaurantId: restaurantToken.value,
    tableId: tableId.value
    }
    console.log(payload)
    const result = await eapi.menu.createOrder(payload,{noticeSuccess:true})
}


const test = () => {
    console.log(menuItem.value);
    
}


</script>
