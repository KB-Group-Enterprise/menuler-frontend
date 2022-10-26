<template>
  <div class="w-full mt-6">
    <div
      class="border p-2 mb-4 transition hover:border-2 cursor-pointer"
      @click="selectUploadInput()"
    >
      <div v-if="previewUrl" class="w-full flex justify-center">
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
      <div class="my-4">
        <!-- Button trigger modal -->

        <!-- Modal -->
        <div v-if="menu">
          <div class="font-bold">ตัวเลือกเพิ่มเติม</div>
          <div>
            <div 
            hidden               
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            id="option-modal-opener"></div>
            <div
              class="flex justify-center items-center cursor-pointer"
              @click="openCreateOption"
            >
              <IconifyIcon icon="carbon:add-alt" class="mx-1"></IconifyIcon>
              เพิ่มตัวเลือก
            </div>
            <div v-for="(option, index) in options" :key="index" class="border rounded-lg p-2 my-1">
              <div class="flex justify-between">
                <span>{{ option.name }}</span>
                <span>{{ option.price }} บาท</span>
              </div>
              <hr class="my-1" />
              <div class="flex justify-between">
                <span class="text-yellow-500 cursor-pointer" @click="editOption(option)">แก้ไข</span>
                <span class="text-red-500 cursor-pointer" @click="deleteOption(option)">ลบ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center space-x-1">
        <BaseButtomTW type="submit" class="w-full"> บันทึก </BaseButtomTW>
      </div>
    </Form>
    <div
      class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog relative w-auto pointer-events-none">
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
          >
            <h5
              class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              {{ isEditOption ? 'แก้ไขตัวเลือก' : 'เพิ่มตัวเลือก' }}
            </h5>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md space-x-2"
          >
            <Form class="w-full" @submit="submitOption">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                ชื่อตัวเลือก
              </label>
              <Field
                as="input"
                name="option_name"
                rules="required"
                :validate-on-input="true"
                placeholder="ชื่อเมนู"
                v-model="optionName"
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
              >
              </Field>
              <ErrorMessage class="text-red-500 text-sm" name="option_name" />
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                ราคา
              </label>
              <Field
                as="input"
                type="number"
                name="option_price"
                rules="required"
                :validate-on-input="true"
                placeholder="ราคา"
                v-model="optionPrice"
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
              >
              </Field>
              <ErrorMessage class="text-red-500 text-sm" name="option_price" />
              <div class="w-full flex flex-nowrap justify-end space-x-2 mt-2">
                <BaseButtomTW id="dismiss-option-modal" type="button" color="danger" data-bs-dismiss="modal">
                  ยกเลิก
                </BaseButtomTW>
                <BaseButtomTW type="submit"> บันทึก </BaseButtomTW>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import BaseButtomTW from "../Base/BaseButtomTW.vue";
import { image } from "@vee-validate/rules";
import { Swaler } from "@/utils/helper/swaler";
import { BussinessMenuItem } from "@/types/dto.types";
import { useEapi } from "@/providers";
const props = defineProps({
  menu: {
    type: Object,
    required: false,
  },
});

const name = ref("");
const price = ref<any>(null);
const description = ref("");
const imgFile = ref<any>(null);
const previewUrl = ref("");
const category = ref("");
const options = ref<any[]>([]);
const isEditOption = ref(false);
const editOptionId = ref('');

const optionName = ref("");
const optionPrice = ref("");

const setPropsData = () => {
  const menuData: BussinessMenuItem = { ...props.menu } as any;
  name.value = menuData.foodName;
  price.value = +menuData.price;
  description.value = menuData.description;
  category.value = menuData.category;
  previewUrl.value = menuData.imageUrl;
  options.value = menuData.options;
}

if (props.menu) {
  setPropsData()
}

const menuProps = computed(() => props.menu);
watch(menuProps, setPropsData);

const selectUploadInput = () => {
  const imageInput = document.getElementById("image-input");
  imageInput?.click();
};

const emit = defineEmits(["save", "refetch"]);

const submit = () => {
  if (!imgFile.value && !props.menu) {
    Swaler.warn("กรุณาอัพโหลดรูปภาพเมนู");
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

  emit("save", payload);
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

const eapi = useEapi();

const submitOption = async () => {
  if (isEditOption.value) {
    return await sendEditOption();
  }
  // console.log('called');
  if (!props.menu) return
  const name = optionName.value;
  const price = Number(optionPrice.value) || 0;
  const menuId = props.menu.id;
  // console.log(menuId, dto);
  const dto = {
    name: name,
    description: 'placeholder',
    price: price,
    menuId
  }
  await eapi.menu.createMenuOption(dto, { noticeSuccess: true });
  emit("refetch");
  const element = document.getElementById('option-modal-opener');
  element?.click();
}

const editOption = async (option: any) => {
  isEditOption.value = true;
  editOptionId.value = option.id;
  const element = document.getElementById('option-modal-opener');
  optionName.value = option.name;
  optionPrice.value = option.price;
  element?.click();
}

const openCreateOption = async () => {
  isEditOption.value = false;
  optionName.value  = '';
  optionPrice.value = '';
  const element = document.getElementById('option-modal-opener');
  element?.click();
}

const sendEditOption = async () => {
  if (!props.menu) return
  const name = optionName.value;
  const price = Number(optionPrice.value) || 0;
  const menuId = props.menu.id;
  // console.log(menuId, dto);
  const dto = {
    description: 'placeholder',
    name: name,
    price: price,
    menuId
  }
  await eapi.menu.updateMenuOption(editOptionId.value, dto, { noticeSuccess: true });
  emit("refetch");
  const element = document.getElementById('option-modal-opener');
  element?.click();
}

const deleteOption = async (option: any) => {
  const result = await Swaler.question(`ที่จะลบตัวเลือก ${option.name}`);
  if (result.isConfirmed) {
    await eapi.menu.deleteMenuOption(option.id, { noticeSuccess: true });
    emit("refetch");
  }
}
</script>

<style lang="scss" scoped></style>
