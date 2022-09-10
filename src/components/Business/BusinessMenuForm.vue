<template>
    <div class="w-full mt-6">
        <div class="border p-2 mb-4 transition hover:border-2 cursor-pointer" @click="selectUploadInput()">
          <div v-if="image && previewUrl">
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
                rules="required"
                :validate-on-input="true"
                placeholder="คำอธิบาย"
                v-model="description"
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
              >
              </Field>
              <ErrorMessage class="text-red-500 text-sm" name="email" />
          </div>
            <div class="flex items-center justify-center space-x-1">
              <BaseButtomTW type="submit" class="w-full">
                เพิ่ม
              </BaseButtomTW>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import BaseButtomTW from '../Base/BaseButtomTW.vue';
import { image } from '@vee-validate/rules';

const name = ref('');
const price = ref(null);
const description = ref('');
const imgFile = ref(null);
const previewUrl = ref('');
const selectUploadInput = () => {
  const imageInput = document.getElementById('image-input');
  imageInput.click();
}

const submit = () => {
  const payload = {
    name: name.value,
    price: price.value,
    description: description.value,
  }
  const imgFileData = imgFile.value;

  console.log(payload, imgFileData)
};

const readURL = (input) => {
            const target = input.target
            if (target.files && target.files[0]) {
                imgFile.value = target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(target.files[0]);
                reader.onload = (e) => {
                  if (e.target.result) {
                    previewUrl.value = e.target.result;
                  }
                }
            }
        }

</script>

<style lang="scss" scoped>
</style>