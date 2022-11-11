<template>
  <div
    class="w-full h-screen bg-gray-100 max-w-md mx-auto relative flex flex-col items-center z-20 overflow-y-auto pb-20"
  >
    <div class="absolute left-5 top-5 text-2xl" @click="close">
      <IconifyIcon icon="ep:back" class="mx-1" />
    </div>
    <div class="w-full" v-if="notiTableData.order">
      <div class="text-2xl text-center my-4">ชำระเงิน</div>
      <div class="px-12">
        <hr />
      </div>
      <div v-if="notiTableData.order.bill">
        <div class="px-4 py-2">
          <div class="flex w-full justify-center mb-2">รายการอาหาร</div>
          <div
            class="grid grid-cols-5 px-2 text-xs"
            v-for="(item, index) in notiTableData.order.foodOrderList.filter((i: any) => i.status != 'CANCEL')"
            :key="index"
          >
            <div v-for="clientId in item.clientId" :key="clientId">
              <span class="text-xs">{{ findUserByUserId(clientId).username }}</span>
            </div>
            <div class="flex w-full col-span-2">{{ item.menu.foodName }}</div>
            <div class="flex w-full col-span-2 justify-end">{{ item.menu.price }} บาท</div>
            <div></div>
            <div class="col-span-4 mb-2" v-if="findOptionsByIdList(item.optionIds).length">
              <div
                class=""
                v-for="(option, index) in findOptionsByIdList(item.optionIds)"
                :key="option.id"
              >
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
            <div class="flex w-full justify-end font-bold">
              {{ orderedFoodPrice }}
              <div class="font-normal ml-1">บาท</div>
            </div>
          </div>

          <div class="accordion" id="accordionExample">
            <div class=""></div>
          </div>
        </div>
        <div class="fixed bottom-0 w-full">
          <div
            :class="
              paymentMode !== 'NONE' ? 'translate-y-[-100%] duration-500' : 'translate-y-[0%]'
            "
            class="fixed bg-white transition fade-in w-full p-2 pt-4 -z-10"
          >
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="flex justify-center">
                <img
                  class="w-8/12"
                  src="https://thaiartisanfoods.com/wp-content/uploads/2019/02/promptpay-QR.jpg"
                />
              </div>
            </div>
            <div class="text-center">{{ restaurantInfo.restaurant.restaurantName }}</div>
            <div class="text-center text-xl">{{ numberWithCommas(orderedFoodPrice) }} บาท</div>
            <div class="text-center text-xs text-gray-400">
              หมายเลขออเดอร์ <br />
              {{ notiTableData.order.id }}
            </div>
            <div class="flex w-full gap-x-2 my-2">
              <h2 class="mb-0" id="headingTwo">
                <button
                  class="collapsed relative flex items-center text-base text-main bg-white border-0 transition focus:outline-none w-10 h-10 justify-center shadow rounded-md"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <IconifyIcon icon="mingcute:qrcode-line" class="text-4xl" />
                </button>
              </h2>
              <h2 class="mb-0 w-full" id="headingTwo">
                <a
                  class="collapsed relative flex items-center text-base text-main bg-white border-0 transition focus:outline-none w-full h-10 justify-center shadow rounded-md"
                  type="button"
                  href="https://kpaymentgateway-services.kasikornbank.com/KPGW-Redirect-Webapi/Appswitch/KMPVWY0000000000ECAFE7979024B3CBAED472A29FCA746PMT"
                  target="_blank"
                >
                  ชำระผ่านธนาคาร
                </a>
              </h2>
            </div>
            <Transition name="component-fade" type="transition">
              <div v-if="paymentMode === 'DIVIDE' || paymentMode === 'EACH'">
                <div class="text-center">
                  {{ paymentMode === 'DIVIDE' ? 'หารจ่าย' : 'จ่ายแยก' }}
                  {{ notiTableData.usernameInRoom.length }} คน
                </div>
                <div
                  v-for="user in userPayments"
                  :key="user.id"
                  class="flex flex-nowrap items-center space-x-2 p-3 border border-l-0 border-r-0"
                >
                  <div
                    class="w-10 h-10 p-0.5 rounded-full"
                    :class="[user.price ? 'bg-yellow-400' : 'bg-gray-400']"
                  >
                    <img
                      class="rounded-full"
                      src="https://static.vecteezy.com/system/resources/previews/000/964/198/large_2x/fast-food-meal-set-vector.jpg"
                    />
                  </div>
                  <div>
                    <div>
                      <span class="font-bold text-base">{{ user.username }}</span>
                      <span v-if="userId === user.id" class="mx-2 text-sm">(คุณ)</span>
                    </div>
                    <span>{{ numberWithCommas(user.price) }} บาท</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <div
            class="sticky grid grid-cols-4 gap-x-2 w-full bg-white h-14 md:px-10 px-2 items-center shadow text-main"
          >
            <button
              class="w-full text-xs bg-gray-50 text-main py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white"
              :disabled="notiTableData.usernameInRoom.length <= 1"
              @click="paymentMode = 'DIVIDE'"
            >
              หารเท่ากัน
            </button>
            <button
              class="w-full text-xs bg-gray-50 text-main py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white"
              :disabled="notiTableData.usernameInRoom.length <= 1"
              @click="paymentMode = 'EACH'"
            >
              จ่ายแยก
            </button>
            <button
              @click="paymentMode = 'SUM'"
              class="w-full bg-blue-400 text-white py-2 rounded-md shadow text-center disabled:bg-gray-300 disabled:text-white col-span-2"
            >
              {{ notiTableData.usernameInRoom.length > 1 ? 'จ่ายรวม' : 'จ่าย' }}
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <div></div>
          <div class="text-xl font-bold my-5">กำลังยืนยันการเช็คบิล</div>
          <Vue3Lottie :animationData="LoadingLottie" :height="180" :width="180" />
          <div class="text-xs my-3">กระรุณารอสักครู่</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-2xl text-center my-4">ยังไม่มีออเดอร์</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LoadingLottie from '@/assets/lottie/cash.json';
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
  restaurantInfo,
  orderedFoodPriceByClientId,
} from '@/composable/menu-state';
import { useEapi } from '@/providers';
import { useSocketIO } from '@/composable/socket';
import { string } from 'yup';
import { useToast } from 'vue-toastification';
import { Swaler } from '@/utils/helper/swaler';
import numberWithCommas from '@/utils/helper/numberWithCommas';
const { socket } = useSocketIO();

const paymentMode = ref<'SUM' | 'DIVIDE' | 'EACH' | 'NONE'>('NONE');

const eapi = useEapi();
const toast = useToast();

const userPayments = ref<{ username: string; price: number; id: string }[]>([]);
watch(paymentMode, (val) => {
  if (val === 'DIVIDE') {
    const each = orderedFoodPrice.value / notiTableData.value.usernameInRoom.length;
    userPayments.value = notiTableData.value.usernameInRoom.map((i: any) => {
      return {
        id: i.id,
        username: i.username,
        price: each,
      };
    });
  } else if (val === 'EACH') {
    userPayments.value = notiTableData.value.usernameInRoom.map((i: any) => {
      return {
        id: i.id,
        username: i.username,
        price: orderedFoodPriceByClientId(i.id),
      };
    });
  }
});

const close = () => {
  modalCheckout.value = false;
  console.log('close');
};
</script>
