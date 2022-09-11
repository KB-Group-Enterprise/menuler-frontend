<template>
  <div class="bg-white shadow-md rounded px-8 mx-4 pt-6 pb-8 mb-4 flex flex-col">
    <Form class="w-full" @submit="submit">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          อีเมลล์
        </label>
        <Field
            as="input"
            name="email"
            rules="required|email"
            :validate-on-input="true"
            placeholder="อีเมลล์"
            v-model="email"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
        >
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="email" />
      </div>
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          ชื่อจริง
        </label>
        <Field
            as="input"
            name="firstName"
            rules="required"
            :validate-on-input="true"
            placeholder="ชื่อจริง"
            v-model="firstName"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
        >
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="firstName" />
      </div>
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          นาทสกุล
        </label>
        <Field
            as="input"
            name="lastName"
            rules="required"
            :validate-on-input="true"
            placeholder="นาทสกุล"
            v-model="lastName"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
        >
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="lastName" />
      </div>
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        รูปภาพ
      </label>
      <div class="border p-2 mb-4 transition hover:border-2 cursor-pointer" @click="selectUploadInput()">
        <div v-if="previewUrl">
          <img :src="previewUrl" class="object-cover" />
        </div>
        <div v-else>
          <img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="placeholder" />
        </div>
        <input id="image-input" hidden type='file' @change="readURL" />
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
          ที่อยู่ร้านอาหาร (ลิง์ google maps)
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
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          รหัสผ่าน
        </label>
        <Field
            name="password"
            rules="required"
            type="password"
            :validate-on-input="true"
            placeholder="รหัสผ่าน"
            v-model="password"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
        >
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="password" />
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          ยืนยันรหัสผ่าน
        </label>
        <Field
            name="confirmation"
            rules="required|confirmed:@password"
            type="password"
            :validate-on-input="true"
            placeholder="ยืนยันรหัสผ่าน"
            v-model="confirmation"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
        >
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="confirmation" />
      </div>
      <div class="flex items-center justify-center space-x-1">
        <BaseButtomTW :is-loading="isLoading" type="submit" class="w-full">
            สมัครสมาชิก
        </BaseButtomTW>
      </div>
      <p class="text-center mt-4">มีบัญชีอยู่แล้ว <router-link to="/business/login" class="text-blue-500 underline">เข้าสู่ระบบ</router-link></p>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/runtime-dom';
import { Form, Field, ErrorMessage } from "vee-validate";
import BaseButtomTW from '../Base/BaseButtomTW.vue';
import { useAuth } from '@/providers/auth';
import { useEapi } from '@/providers';
import { POSITION, useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const isLoading = ref(false);

const email = ref('');
const password = ref('');
const confirmation = ref('');
const restaurantName = ref('');
const location = ref('');
const firstName = ref('');
const lastName = ref('');
const imgFile = ref<any>();
const previewUrl = ref('');

const selectUploadInput = () => {
  const imageInput = document.getElementById('image-input');
  imageInput?.click();
}

const readURL = (input: any) => {
            const target = input.target
            if (target.files && target.files[0]) {
                imgFile.value = target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(target.files[0]);
                reader.onload = (e: any) => {
                  if (e.target.result) {
                    previewUrl.value = e.target.result;
                  }
                }
            }
}

const auth = useAuth();
const eapi = useEapi();
const toast = useToast();
const router = useRouter();

const submit = async () => {
    isLoading.value = true;

    const payload = new FormData();

    payload.append('email',email.value)
    payload.append('password', password.value)
    payload.append('restaurantName',restaurantName.value)
    payload.append('location',location.value)
    payload.append('restaurantImage',imgFile.value)
    payload.append('firstname',firstName.value)
    payload.append('lastname',lastName.value)

    const result = await eapi.business.sendRegister(payload, { noticeSuccess: true, fallbackMessageSuccess: 'สมัครสมาชิกสำเร็จ' });
    if (result.success) {
        login(email.value, password.value)
    }
    isLoading.value = false;
};

const login = async (email: string, password: string) => {
  isLoading.value = true;
  const result = await auth.login({ email: email, password: password });
  isLoading.value = false;
  if (result.data && result.data.isSuccess) {
    toast.success('เข้าสู่ระบบสำเร็จ', { position: POSITION.BOTTOM_CENTER });
    router.push('/business/dashboard');
  } else {
    toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกค้อง', { position: POSITION.BOTTOM_CENTER });
  }
};
</script>
<style scoped></style>
