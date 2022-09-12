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
      <div class="mb-6">
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
      <div class="flex items-center justify-center space-x-1">
        <BaseButtomTW :is-loading="isLoading" type="submit" class="w-full">
          เข้าสู่ระบบ
        </BaseButtomTW>
      </div>
      <p class="text-center mt-4">
        ยังไม่มีผู้ใช้
        <router-link to="/business/register" class="text-blue-500 underline"
          >สมัครสมาชิก</router-link
        >
      </p>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/runtime-dom';
import { Form, Field, ErrorMessage } from 'vee-validate';
import BaseButtomTW from '../Base/BaseButtomTW.vue';
import { useAuth } from '@/providers/auth';
import { POSITION, useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const isLoading = ref(false);

// const email = ref('admin@email.com');
const email = ref('demo@gmail.com');
const password = ref('Aa123456');


const auth = useAuth();
const toast = useToast();
const router = useRouter();

const submit = async () => {
  isLoading.value = true;
  const result = await auth.login({ email: email.value, password: password.value });
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
