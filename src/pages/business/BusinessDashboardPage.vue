<template>
  <BaseContainer>
    <Transition name="component-fade" type="transition">
      <BaseLoading v-if="isLoading" />
      <div v-else class="flex flex-col justify-center items-center">
        <!-- <BusinessHeader />
        <div class="text-center text-lg my-2">ร้านอาหาร</div> -->
        <!-- <div class="w-11/12 space-y-2">
          <div v-if="restaurant" class="p-6 rounded-lg shadow-lg bg-white w-full">
            <div
              class="border p-2 mb-4 transition hover:border-2 cursor-pointer flex justify-center"
            >
              <div v-if="restaurant.restaurantImage && restaurant.restaurantImage[0]">
                <img :src="restaurant.restaurantImage[0]" class="object-cover" />
              </div>
              <div v-else>
                <img
                  src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                  alt="placeholder"
                />
              </div>
            </div>
            <h5 class="text-gray-900 text-center text-xl leading-tight font-medium mb-2">
              {{ restaurant.restaurantName }}
            </h5>
            <div
              class="font-bold text-sm space-x-2 justify-center rounded text-center p-1 my-2 flex"
            >
              <div
                :class="[restaurant.status === 'OPEN' ? 'bg-green-400' : 'bg-gray-400']"
                class="w-5 h-5 rounded-full"
              ></div>
              <div>{{ restaurant.status === 'OPEN' ? 'เปิดให้บริการ' : 'ปิดให้บริการ' }}</div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <BaseButtomTW @click="router.push('/business/menu')"> จัดการเมนู </BaseButtomTW>
              <BaseButtomTW color="secondary" @click="router.push('/business/table')">
                จัดการโต๊ะ
              </BaseButtomTW>
              <BaseButtomTW @click="router.push('/business/edit')" color="warning">
                แก้ไขร้าน
              </BaseButtomTW>
              <BaseButtomTW @click="router.push('/business/summary')" color="info">
                ดูสรุปผล
              </BaseButtomTW>
              <BaseButtomTW @click="logout" color="danger"> ออกจากระบบ </BaseButtomTW>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <BaseLoading />
          </div>
        </div> -->
        <div class="w-11/12 flex flex-col items-center mt-4">
          <h1 class="text-center text-xl">รายการสั่งอาหาร</h1>
          <div class="w-full flex justify-center pt-2">
            <div class="w-full max-w-lg grid grid-cols-2 text-center">
              <div class="border transition-all" :class="viewMode === 'TABLE' ? 'bg-blue-400 text-white' : ''" @click="viewMode = 'TABLE'">แบบรายโต๊ะ</div>
              <div class="border transition-all" :class="viewMode === 'MENU' ? 'bg-blue-400 text-white' : ''" @click="viewMode = 'MENU'">แบบรายรายการ</div>
            </div>
          </div>
          <div v-if="!orders.length" class="flex flex-col justify-center w-full items-center text-gray-400 my-4 mt-20 space-y-4">
            <Vue3Lottie :animationData="LoadingLottie" :height="100" :width="100" />
            <div class="animated animate-pulse">กำลังรอลูกค้าสั่งอาหาร</div>
          </div>
          <div v-if="viewMode === 'TABLE'" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
            <div
              v-for="order in orders"
              :key="order.id"
              class="w-full bg-gray-100 rounded p-4 my-2 shadow-md"
            >
              <div>
                <div class="font-bold text-xl" v-if="order.table">
                  โต๊ะ {{ order.table.tableName }}
                </div>
                <div class="flex justify-between">
                  <span>{{ formatDateLocale(order.createAt) }}</span>
                  <span class="font-bold">{{ translate(order.clientState) }}</span>
                </div>
                <div class="flex flex-nowrap justify-end space-x-2 my-2">
                  <div
                    v-show="order.clientState === 'BILLING' && order.status === 'BILLING'"
                    class="w-full flex-nowrap flex justify-between"
                  >
                    <BaseButtomTW
                      color="danger"
                      @click="updateBillStatus(order, 'CANCEL')"
                      >ยกเลิกจ่าย</BaseButtomTW
                    >
                    <BaseButtomTW @click="viewBill(order)">ดูรายละเอียดบิล</BaseButtomTW>
                    <BaseButtomTW color="warning" @click="updateBillStatus(order, 'PAID')"
                      >จ่ายสำเร็จ</BaseButtomTW
                    >
                  </div>
                  <BaseButtomTW
                    v-show="order.clientState === 'BILLING' && order.status !== 'BILLING'"
                    color="warning"
                    @click="confirmBill(order)"
                    >ยืนยันการออกบิล</BaseButtomTW
                  >
                  <BaseButtomTW
                    v-show="
                      order.clientState !== 'REJECT' && order.clientState !== 'BILLING'
                    "
                    color="danger"
                    @click="cancelOrder(order)"
                    >ยกเลิกออเดอร์</BaseButtomTW
                  >
                  <BaseButtomTW
                    v-show="
                      order.clientState === 'PENDING' ||
                      order.clientState === 'UPDATE_ORDER'
                    "
                    color="success"
                    @click="confirmOrder(order)"
                    >ยืนยันออเดอร์</BaseButtomTW
                  >
                </div>
                <!-- <div class="w-full text-center mt-2 text-blue-400 cursor-pointer" @click="order.open = !order.open">{{ !order.open ? 'ดูเพิ่มเติม' : 'ดูน้อยลง' }}</div> -->
                <div v-if="order.open || true" class="w-full grid grid-cols-2 lg:grid-cols-3 gap-2">
                  <div
                    v-for="(food, index) in order.foodOrderList"
                    :key="food.id"
                    class="w-full border-2 rounded p-3 my-1 fade-in h-48 flex flex-col justify-between bg-white relative"
                  >
                    <div class="mt-4">
                    <div class="w-full text-center text-white rounded-t absolute top-0 left-0 transition-all" :class="food.status === 'SERVED' ? 'bg-green-400' : food.status === 'COOKING' ? 'bg-orange-400' : 'bg-gray-400'">{{ translate(food.status) }}</div>
                    <div class="font-bold" v-if="food.clientId[0]">ผู้สั่ง {{ getClient(order,food.clientId[0]).username }}</div>
                    <div class="flex flex-nowrap mt-2">
                      <span class="">{{ food.menu.foodName }}</span>
                    </div>
                    <div class="ml-5">
                      <div
                        v-for="option of findOptionsByIdList(food.optionIds)"
                        :key="food.id + option.id"
                      >
                        + {{ option.name }}
                      </div>
                    </div>
                    </div>
                    <!-- <hr class="my-2" /> -->
                    <div
                      v-show="
                        order.clientState !== 'PENDING' && order.clientState !== 'REJECT'
                      "
                      class="flex flex-col space-y-2 w-full"
                    >
                      <!-- <BaseButtomTW 
                        v-show="!(food.status === 'COOKING' || food.status === 'SERVED')" 
                        color="warning" 
                        @click="updateFoodStatus(order, food.id, 'COOKING')"
                      > กำลังปรุง </BaseButtomTW> -->
                      <div
                        v-show="food.status !== 'SERVED'"
                        class="w-full text-green-400 cursor-pointer"
                        color="success"
                        @click="updateFoodStatus(order, food.id, 'SERVED')"
                      >
                        ยืนยันการเซิร์ฟ
                      </div>
                      <div
                        v-show="order.status !== 'BILLING' && food.status !== 'SERVED'"
                        class="w-full text-red-400 cursor-pointer"
                        color="danger"
                        @click="deleteFoodOrder(order, food.id)"
                      >
                        <hr />
                        ลบอาหาร 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
              <div v-if="!foodPools.length" class="text-center text-gray-100 my-4">
                ยังไม่มีรายการอาหาร
              </div>
              <div
                v-for="(food, index) in foodPools"
                :key="'menu-' + food.id"
                class="bg-white rounded-md shadow h-full relative flex flex-col"
              >
                <div class="flex flex-col relative">
                  <img :src="food.menu.imageUrl" class="w-full rounded-t-md" />
                  <div
                    class="absolute right-0 top-0 p-1 rounded-tr-md rounded-bl-md text-white text-base"
                    :class="
                      getStatus(food.status) == 'กำลังปรุง'
                        ? 'bg-orange-500'
                        : getStatus(food.status) == 'กำลังรอ'
                        ? 'bg-yellow-500'
                        : getStatus(food.status) == 'เสิร์ฟแล้ว'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    "
                  >
                    {{ getStatus(food.status) }}
                  </div>
                  <div class="flex flex-row w-full justify-between px-2 mt-1">
                    <div>
                      {{ food.table.tableName }}
                    </div>
                    <div>
                      {{ food.clientState }}
                    </div>
                  </div>
                </div>
                <div class="font-bold px-2">
                  {{ food.menu.foodName }}
                </div>
                <div
                  v-for="option of findOptionsByIdList(food.optionIds)"
                  :key="food.id + option.id"
                  class="px-2"
                >
                  + {{ option.name }}
                </div>
                <div class="flex w-full h-full items-end">
                  <div
                    v-if="food.clientState !== 'PENDING' && food.clientState !== 'REJECT'"
                    class="w-full mt-2"
                  >
                    <BaseButtomTW
                      class="w-full"
                      v-show="food.status == 'PENDING'"
                      color="warningna"
                      @click="updateFoodStatus({ id: food.orderId }, food.id, 'COOKING')"
                    >
                      เริ่มทำอาหาร
                    </BaseButtomTW>
                    <BaseButtomTW
                      class="w-full"
                      v-show="food.status == 'COOKING'"
                      color="successna"
                      @click="updateFoodStatus({ id: food.orderId }, food.id, 'SERVED')"
                    >
                      ยืนยันการเสิร์ฟ
                    </BaseButtomTW>
                  </div>
                  <div v-else>รอออเดอร์ยินยัน</div>
                </div>
              </div>
            </div>

            <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
              <div
                v-for="(food, index) in completedFoodPools"
                :key="'menu-' + food.id"
                class="bg-white rounded-md shadow h-full relative flex flex-col"
              >
                <div class="flex flex-col relative">
                  <img :src="food.menu.imageUrl" class="w-full rounded-t-md" />
                  <div
                    class="absolute right-0 top-0 p-1 rounded-tr-md rounded-bl-md text-white text-base"
                    :class="
                      getStatus(food.status) == 'กำลังปรุง'
                        ? 'bg-orange-500'
                        : getStatus(food.status) == 'กำลังรอ'
                        ? 'bg-yellow-500'
                        : getStatus(food.status) == 'เสิร์ฟแล้ว'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    "
                  >
                    {{ getStatus(food.status) }}
                  </div>
                  <div class="flex flex-row w-full justify-between px-2 mt-1">
                    <div>
                      {{ food.table.tableName }}
                    </div>
                    <div>
                      {{ translate(food.clientState) }}
                    </div>
                  </div>
                </div>
                <div class="font-bold px-2">
                  {{ food.menu.foodName }}
                </div>
                <div
                  v-for="option of findOptionsByIdList(food.optionIds)"
                  :key="food.id + option.id"
                  class="px-2"
                >
                  + {{ option.name }}
                </div>
                <div class="flex w-full h-full items-end">
                  <div
                    v-if="food.clientState !== 'PENDING' && food.clientState !== 'REJECT'"
                    class="w-full mt-2"
                  >
                    <BaseButtomTW
                      class="w-full"
                      v-show="food.status == 'PENDING'"
                      color="warning"
                      @click="updateFoodStatus({ id: food.orderId }, food.id, 'COOKING')"
                    >
                      เริ่มทำอาหาร
                    </BaseButtomTW>
                    <BaseButtomTW
                      class="w-full"
                      v-show="food.status == 'COOKING'"
                      color="success"
                      @click="updateFoodStatus({ id: food.orderId }, food.id, 'SERVED')"
                    >
                      ยืนยันการเสิร์ฟ
                    </BaseButtomTW>
                  </div>
                  <div v-else>รอออเดอร์ยินยัน</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          id="toggle-bill-modal"
          type="button"
          class="hidden"
          data-bs-toggle="modal"
          data-bs-target="#bill-modal"
        ></button>
        <div
          class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="bill-modal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog relative w-auto pointer-events-none">
            <div
              v-if="billData"
              class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
            >
              <div
                class="modal-header flex flex-col flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
              >
                <h5
                  class="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  บิลค่าอาหารโต๊ะ {{ billData.table.tableName }}
                </h5>
                <h2>
                  {{ formatDateLocale(billData.createdAt) }}
                </h2>
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body relative p-4">
                <div class="w-full">
                  <div class="">
                    <span class="font-bold">รายการอาหาร</span>
                  </div>
                  <div
                    v-for="(food, index) in billData.foodOrderList"
                    :key="food.id"
                    class="w-full"
                  >
                    <div class="flex justify-between flex-nowrap">
                      <span class="">- {{ food.menu.foodName }}</span>
                      <span class="">{{ numberWithCommas(food.menu.price) }} บาท</span>
                    </div>
                    <div class="ml-5">
                      <div
                        v-for="option of findOptionsByIdList(food.optionIds)"
                        :key="food.id + option.id"
                      >
                        <div class="flex flex-nowrap justify-between">
                          <span>+ {{ option.name }}</span>
                          <span>+ {{ numberWithCommas(option.price) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <span class="font-bold">รูปแบบการจ่าย</span> {{ translate(billData.billMethod) ?? 'จ่ายรวม' }}
                    <div v-for="member in billData.memberPrices" :key="member.username">
                      <div class="flex justify-between flex-nowrap">
                        <span class="">- {{ member.username }}</span>
                        <span class="">{{ numberWithCommas(member.price) }} บาท</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-nowrap justify-between mt-5 font-bold">
                    <span>ราคาทั้งหมด</span>
                    <span>{{ numberWithCommas(billData.totalPrice) }} บาท</span>
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
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  @click="
                    updateBillStatus(
                      { id: billData.orderId, bill: { id: billData.billId } },
                      'PAID'
                    )
                  "
                >
                  ยันยันการจ่าย
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseLoading from "@/components/Base/BaseLoading.vue";
import { useEapi } from "@/providers";
import { RestaurantListItem, UpdateClientOrderDto } from "@/types/dto.types";
import formatDateLocale from "@/utils/helper/formatDateLocale";
import { computed, ref, watch } from "@vue/runtime-dom";
import BaseButtomTW from "@/components/Base/BaseButtomTW.vue";
import { useAuth } from "@/providers/auth";
import Swal from "sweetalert2";
import { POSITION, useToast } from "vue-toastification";
import { loadIcon } from "@iconify/vue";
import BusinessHeader from "@/components/Business/BusinessHeader.vue";
import { useSocketIOWithAuth } from "@/composable/socket";
import { useRouter } from "vue-router";
import { string } from "yup";
import { findOptionsByIdList, menuList } from "@/composable/menu-state";
import numberWithCommas from "@/utils/helper/numberWithCommas";
import { translate } from "@/utils/helper/translate";
import { Vue3Lottie } from 'vue3-lottie';
import LoadingLottie from '@/assets/lottie/loading.json';
const isLoading = ref(false);
const eapi = useEapi();
const auth = useAuth();
const router = useRouter();

const profile = computed(() => auth.state.user);
// const restaurant = computed(() => profile?.value?.restaurant);
const restaurant = ref<RestaurantListItem | null>(null);
const toast = useToast();
const { socket } = useSocketIOWithAuth(auth.getToken() || "");
const orders = ref<any[]>([]);
const foodPools = ref<any[]>([]);
const completedFoodPools = ref<any[]>([]);
const viewMode = ref<"TABLE" | "MENU">("TABLE");
const billData = ref<any>(null);

socket.on("currentOrder", (e) => {
  console.log('currentOrder',e);
  orders.value = e.orders.map((i: any) => {
    i.open = false;
    return i;
  });
});

const getClient = (order: any, clientId: any) => {
  const client = order.clientGroup.client.find((i:any) => i.id === clientId);
  return client;
}

watch(orders, (val) => {
  // console.log('watch orders', val);
  foodPools.value = orders.value
    .map((order) => {
      const foodOrderList = order.foodOrderList.filter((i: any) => {
        return i.status === "PENDING" || i.status === "COOKING";
      });
      const foodOrderListWithTable = foodOrderList.map((food: any) => {
        food.table = order.table;
        food.clientState = order.clientState;
        return food;
      });
      console.log(foodOrderListWithTable);
      // KB you can sort here
      return foodOrderListWithTable;
      // return foodOrderListWithOrder
    })
    .flat(1);

  completedFoodPools.value = orders.value
    .map((order) => {
      const foodOrderList = order.foodOrderList.filter((i: any) => {
        return i.status === "SERVED";
      });
      const foodOrderListWithTable = foodOrderList.map((food: any) => {
        food.table = order.table;
        food.clientState = order.clientState;
        return food;
      });
      console.log(foodOrderListWithTable);
      // KB you can sort here
      return foodOrderListWithTable;
      // return foodOrderListWithOrder
    })
    .flat(1);
});

const getStatus = (status: any) => {
  let statusTH = "";
  if (status === "COOKING") statusTH = "กำลังปรุง";
  else if (status === "SERVED") statusTH = "เสิร์ฟแล้ว";
  else if (status === "CANCEL") statusTH = "ยกเลิก";
  else if (status === "PENDING") statusTH = "กำลังรอ";
  return statusTH;
};

socket.emit("getCurrentOrder");

const fetchResturant = async () => {
  // isLoading.value = true;
  const result = await eapi.business.getResturantById(profile.value?.restaurant.id);
  //   await sleeper(1000);
  // isLoading.value = false;
  //   console.log(JSON.stringify(result.data));
  if (result.success && result.data) {
    // console.log(result.data);
    restaurant.value = result.data.restaurant;
  }
};
const fetchMenu = async () => {
  const restaurantId = auth.state.user?.restaurant.id;
  const result = await eapi.menu.getMenuByRestaurantId(restaurantId);
  menuList.value = result.data;
};

const fetchData = async () => {
  isLoading.value = true;
  await fetchResturant();
  await fetchMenu();
  isLoading.value = false;
};

const logout = () => {
  auth.logout();
  router.push("/business/login");
};

const confirmOrder = async (order: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    clientState: "CONFIRMED",
  };
  console.log(dto);
  socket.emit("updateClientOrder", dto);
};

const cancelOrder = async (order: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    status: "CANCEL",
  };
  console.log(dto);
  socket.emit("updateClientOrder", dto);
};

const updateFoodStatus = async (
  order: any,
  foodId: string,
  status: "SERVED" | "COOKING"
) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    updateFoodOrderList: [
      {
        foodOrderId: foodId,
        status,
      },
    ],
  };
  console.log(dto);
  socket.emit("updateClientOrder", dto);
};

const deleteFoodOrder = async (order: any, foodId: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    deleteFoodOrderList: [foodId]
  };
  console.log(dto);
  socket.emit("updateClientOrder", dto);
}

const confirmBill = async (order: any) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    status: "BILLING",
  };
  console.log("confirmBillCreation", dto);
  socket.emit("updateClientOrder", dto);
};

const updateBillStatus = async (order: any, status: string) => {
  const dto: UpdateClientOrderDto = {
    orderId: order.id,
    bill: {
      billId: order.bill.id,
      status: status,
    },
  };
  console.log("updateBillStatus", dto);
  socket.emit("updateClientOrder", dto);
};

const viewBill = (order: any) => {
  const billToShow = {
    orderId: order.id,
    createdAt: order.bill.createdAt,
    table: order.table,
    billId: order.bill.id,
    foodOrderList: order.foodOrderList,
    totalPrice: order.bill.totalPrice,
    billMethod: order.bill.method,
    memberPrices: [] as { username: string, price: number }[],
  };
  if (billToShow.billMethod === 'EACH') {
    const memberPriceMap = new Map<string, number>()
    order.clientGroup.client.forEach((c: any) => {
      memberPriceMap.set(c.id, 0)
    })
    billToShow.foodOrderList.forEach((i:any) => {
      const clientId = i.clientId[0]
      if (!memberPriceMap.get(clientId)) { memberPriceMap.set(clientId, 0)}
      memberPriceMap.set(clientId, memberPriceMap.get(clientId) + i.netPrice)
    })
    memberPriceMap.forEach((v,k) => {
      const user = order.clientGroup.client.find((i:any) => i.id === k);
      billToShow.memberPrices.push({
        username: user.username,
        price: v
      })
    })
  }

  if (billToShow.billMethod === 'DIVINE') {
    const memberPriceMap = new Map<string, number>()
    order.clientGroup.client.forEach((c: any) => {
      memberPriceMap.set(c.id, 0)
    })
    const dividedPrice = +(billToShow.totalPrice / memberPriceMap.size).toFixed(2);
    memberPriceMap.forEach((v,k) => {
      const user = order.clientGroup.client.find((i:any) => i.id === k);
      billToShow.memberPrices.push({
        username: user.username,
        price: dividedPrice
      })
    })
  }

  billData.value = billToShow;

  const elem = document.getElementById("toggle-bill-modal");
  if (!elem) return;
  elem.click();
};

fetchData();
// fetchResturant();
// fetchMenu();
</script>

<style scoped></style>
