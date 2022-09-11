<template>
  <LayoutContainer>
    <BaseLoading v-if="isLoading" />
    <div class="w-full" v-else>
      <BusinessHeader title="Update Restaurant" />
      <div class="w-full flex justify-center">
      <Form class="w-10/12" @submit="submit">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> รูปภาพ </label>
        <div class="flex justify-center">
          <div
            class="border p-2 mb-4 transition hover:border-2 cursor-pointer"
            @click="selectUploadInput()"
          >
            <div v-if="previewUrl">
              <img :src="previewUrl" class="object-cover" />
            </div>
            <div v-else>
              <img
                src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                alt="placeholder"
              />
            </div>
            <input id="image-input" hidden type="file" @change="readURL" />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            ชื่อร้าน
          </label>
          <Field
            as="input"
            name="restaurantName"
            rules="required"
            :validate-on-input="true"
            placeholder="ชื่อร้าน"
            v-model="restaurantName"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
          >
          </Field>
          <ErrorMessage class="text-red-500 text-sm" name="restaurantName" />
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            ที่อยู่ร้านอาหาร (ลิงค์ google maps)
          </label>
          <Field
            as="input"
            name="location"
            rules="required"
            :validate-on-input="true"
            placeholder="https://goo.gl/maps/xxxxxxxx"
            v-model="location"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
          >
          </Field>
          <ErrorMessage class="text-red-500 text-sm" name="location" />
        </div>

        <div class="w-full">
            <div class="mb-3 xl:w-96">
              <select 
                v-model="status"
                class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSE">CLOSE</option>
              </select>
            </div>
          </div>

        <div class="flex items-center justify-center space-x-1">
          <BaseButtomTW :is-loading="isSending" type="submit" class="w-full"> บันทึก </BaseButtomTW>
        </div>
      </Form>
      </div>
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { useEapi } from '@/providers';
import { useAuth } from '@/providers/auth';
import { computed, ref } from 'vue';
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import BaseButtomTW from '@/components/Base/BaseButtomTW.vue';
import BaseLoading from '@/components/Base/BaseLoading.vue';
import { useRouter } from 'vue-router';
import router from '@/router';

const auth = useAuth();
const profile = computed(() => auth.state.user);
const eapi = useEapi();
const restaurant = ref<any>(null);
const isSending = ref(false);
const isLoading = ref(false);

const imgFile = ref<any>(null);
const restaurantName = ref('');
const location = ref('');
const previewUrl = ref('');
const status = ref('OPEN');

const fetchData = async () => {
  const result = await eapi.business.getResturantById(profile.value?.restaurant.id);
  if (result.success && result.data) {
    restaurant.value = result.data.restaurant;
    restaurantName.value = restaurant.value.restaurantName;
    location.value = restaurant.value.location;
    previewUrl.value = restaurant.value.restaurantImage;
    status.value = restaurant.value.status;

    isLoading.value = false;
  }
};

const readURL = (input: any) => {
  const target = input.target;
  if (target.files && target.files[0]) {
    imgFile.value = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = (e: any) => {
      if (e.target.result) {
        previewUrl.value = e.target.result;
      }
    };
  }
};

const selectUploadInput = () => {
  const imageInput = document.getElementById('image-input');
  imageInput?.click();
};

const roter = useRouter();

const submit = async () => {
    const payload = new FormData();
    if (imgFile.value) payload.append('restaurantImage', imgFile.value);
    payload.append('restaurantName', restaurantName.value);
    payload.append('location', location.value);
    payload.append('status', status.value);

    const result = await eapi.business.updateRestaurantById(profile.value?.restaurant.id, payload, { noticeSuccess: true });

    if (result.success) {
        router.push('/business/dashboard')
    }
};

fetchData();
</script>

<style scoped></style>
