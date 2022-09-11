<template>
    <div class="w-full mt-6">
        <div class="border p-2 mb-4 transition hover:border-2 cursor-pointer" @click="selectUploadInput()">
          <div v-if="previewUrl">
            <img :src="previewUrl" class="object-cover" />
          </div>
          <div v-else>
            <img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="placeholder" />
          </div>
          <input id="image-input" hidden type='file' @change="readURL" />
        </div>
        <Form class="w-full" @submit="submit">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                ชื่อเมนู
              </label>
              <Field
                as="input"
                name="name"
                rules="required"
                :validate-on-input="true"
                placeholder="ชื่อเมนู"
                v-model="name"
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
              >
              </Field>
              <ErrorMessage class="text-red-500 text-sm" name="email" />
            </div>
            <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                  ราคา
                </label>
                <Field
                  as="input"
                  type="number"
                  name="price"
                  rules="required"
                  :validate-on-input="true"
                  placeholder="ราคา"
                  v-model="price"
                  class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
                >
                </Field>
                <ErrorMessage class="text-red-500 text-sm" name="email" />
            </div>
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                คำอธิบาย
              </label>
              <Field
                as="textarea"
                name="description"
                :validate-on-input="true"
                placeholder="คำอธิบาย"
                v-model="description"
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
              >
              </Field>
              <ErrorMessage class="text-red-500 text-sm" name="email" />
            </div>
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                ชนิด
              </label>
              <Field
                name="category"
                rules="required"
                :validate-on-input="true"
                placeholder="ชนิด"
                v-model="category"
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
              >
              </Field>
              <ErrorMessage class="text-red-500 text-sm" name="email" />
            </div>
            <div class="flex items-center justify-center space-x-1">
              <BaseButtomTW type="submit" class="w-full">
                บันทึก
              </BaseButtomTW>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import BaseButtomTW from '../Base/BaseButtomTW.vue';
import { image } from '@vee-validate/rules';
import { Swaler } from '@/utils/helper/swaler';
import { BussinessMenuItem } from '@/types/dto.types';
;

const props = defineProps({
  menu: {
    type: Object,
    required: false,
  }
})

const name = ref('');
const price = ref<any>(null);
const description = ref('');
const imgFile = ref<any>(null);
const previewUrl = ref('');
const category = ref('');

if (props.menu) {
  const menuData: BussinessMenuItem = { ...props.menu } as any;
  name.value = menuData.foodName;
  price.value = +menuData.price;
  description.value = menuData.description;
  category.value = menuData.category;
  previewUrl.value = menuData.imageUrl;
}

const selectUploadInput = () => {
  const imageInput = document.getElementById('image-input');
  imageInput?.click();
}

const emit = defineEmits(['save']);



const submit = () => {
  if (!imgFile.value && !props.menu) {
    Swaler.warn('กรุณาอัพโหลดรูปภาพเมนู');
    return;
  }
  const payload: Record<string, string> = {
    name: name.value,
    price: price.value,
    description: description.value,
    category: category.value,
  };

  if (imgFile.value) {
    payload.menuImage = imgFile.value;
  }

  emit('save', payload);
};

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

</script>

<style lang="scss" scoped>
</style>