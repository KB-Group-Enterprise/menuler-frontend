<template>
  <BaseContainer>
    <Transition name="component-fade" type="transition">
      <BaseLoading v-if="isLoading" />
      <div v-else class="flex flex-col justify-center">
        <BusinessHeader />
        <div class="text-center text-lg my-2">ร้านอาหาร</div>
        <div class="mx-4 space-y-2">
          <div v-if="restaurant" class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
                <span :class="[restaurant.isActivate ? 'text-green-400' : 'text-gray-400']">
                    {{ restaurant.status === 'OPEN' ? 'เปิด' : 'ปิด' }}
                </span> 
                {{ restaurant.restaurantName }}
              </h5>
              <hr />
              <p class="text-gray-700 text-base mb-4">
                สร้างเมื่อ {{ formatDateLocale(restaurant.registerOn) }}
              </p>
              <div class="flex space-x-2">
              <BaseButtomTW @click="$router.push('/business/menu')">
                จัดการเมนู
              </BaseButtomTW>
              <BaseButtomTW @click="$router.push('/business/table')">
                จัดการโต๊ะ
              </BaseButtomTW>
              </div>
          </div>
          <div v-else class="flex justify-center">
            <BaseLoading />
          </div>
        </div>
      </div>
    </Transition>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue';
import { useEapi } from '@/providers';
import { RestaurantListItem } from '@/types/dto.types';
import formatDateLocale from '@/utils/helper/formatDateLocale';
import { sleeper } from '@/utils/helper/sleeper';
import { computed, ref } from '@vue/runtime-dom';
import BaseButtomTW from '@/components/Base/BaseButtomTW.vue';
import { useAuth } from '@/providers/auth';
import Swal from 'sweetalert2';
import { POSITION, useToast } from 'vue-toastification';
import { loadIcon } from '@iconify/vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
const isLoading = ref(false);
const eapi = useEapi();
const auth = useAuth();

const profile = computed(() => auth.state.user);
;
// const restaurant = computed(() => profile?.value?.restaurant);
const restaurant = ref<RestaurantListItem | null>(null)
const toast = useToast();

const fetchResturant = async () => {
  isLoading.value = true;
  const result = await eapi.business.getResturantById('630f386166de60947795adfb');
  //   await sleeper(1000);
  isLoading.value = false;
  //   console.log(JSON.stringify(result.data));
  if (result.success && result.data) {
    console.log(result.data)
    restaurant.value = result.data.restaurant
  }
};


const addResturant = async () => {
  	
const { value: formValues } = await (Swal.fire)({
  title: 'เพิ่มร้านอาหาร',
  html:
    '<div class="flex flex-col">' +
    '<label>ชื่อร้านอาหาร</label>' +
    '<input id="swal-input1" class="swal2-input">' +
    '<label class="mt-2">ที่อยู่ร้านอาหาร</label>' +
    '<input id="swal-input2" class="swal2-input">'+
    '</div>'
    ,

  focusConfirm: false,
  showCancelButton: true,
  preConfirm: () => {
    return [
      (document.getElementById('swal-input1') as any).value,
      (document.getElementById('swal-input2') as any).value
    ]
  }
})
if (formValues) {
  if (!formValues.every(i => Boolean(i))) {
    toast.error("กรุณากรอกข้อมูลให้ถูกต้อง", { position: POSITION.BOTTOM_CENTER })
  }
  const name = formValues[0];
  const location = formValues[1];
  const payload = {
    restaurantName: name,
    location: location,
  }
  console.log(payload)
  const result = await eapi.business.addResturant(payload, { noticeSuccess: true });
  if (result.success) {
    auth.fetchProfile();
  }
}


}

fetchResturant()
// fetchMenu();
</script>

<style scoped></style>
