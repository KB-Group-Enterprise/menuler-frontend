<template>
  <Form
    v-slot="{ errors, meta, values }"
    :validation-schema="validation"
    class="min-h-full w-full gap-4 pb-4 flex flex-col justify-between"
  >
    <div class="w-full space-y-4">
      <div class="mt-6 w-full text-center text-2xl font-bold">
        {{ $t("purchase.topic.register") }}
      </div>
      <div class="flex flex-col gap-4 w-full">
        <div
          v-for="input in inputs"
          :key="input.key"
          class="w-full flex flex-col items-start"
        >
          <label class="flex justify-between w-full text-sm text-main-600">
            {{ $t(input.key) }}* :
            <span class="text-rose-500">{{ errors[input.key] }}</span>
          </label>
          <!-- @input="(e:any) => (form[input] = e.target?.value)" -->
          <Field
            :as="input.as"
            :name="input.key"
            :validate-on-input="true"
            :placeholder="input.placeholder"
            v-model="register[input.key]"
            class="w-full p-2 outline-none transition-colors bg-main-100 rounded-t-md rounded-b-none border-b-2 border-main-300 focus:border-main-600 focus:bg-main-200"
          >
            <option v-for="option in input.option" :key="option" :value="option">
              {{ option }}
            </option>
          </Field>
        </div>
      </div>
    </div>
    <PurchaseButton @back="emit('back')" @next="next(values)" :disabled="!meta.valid" />
  </Form>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import usePurchase from "@/store/purchase";
import PurchaseButton from "./PurchaseButton.vue";
const { register, setRegister } = usePurchase();

const emit = defineEmits(["next", "back"]);

const inputs = [
  { key: "title", as: "select", option: ["MR", "MS", "MRS"] },
  { key: "firstname", as: "input", placeholder: "John" },
  { key: "lastname", as: "input", placeholder: "Doe" },
  { key: "phone", as: "input", placeholder: "+66 98-765-4321" },
  { key: "email", as: "input", placeholder: "contact@email.com" },
];
const validation = yup.object().shape({
  title: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  phone: yup
    .string()
    .min(9)
    .matches(/[0-9\W]/g)
    .required(),
  email: yup.string().email().required(),
});

const next = (values: any) => {
  setRegister(values);
  emit("next");
  // console.log(values);
};
</script>
