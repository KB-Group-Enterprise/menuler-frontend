<template>
  <div class="w-full">
    <ul class="space-y-2">
      <li
        v-for="list in lists"
        :key="list.key"
        class="p-4 max-w-xl rounded"
        :class="[list.done ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600']"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        @click="handleClick(list.key)"
      >
        <span
          class="inline-flex py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-main-50 rounded"
          :class="list.done ? 'bg-green-600' : 'bg-red-600'"
        >
          <IconifyIcon icon="ant-design:check-square-twotone" class="mx-1"></IconifyIcon>
          {{ list.done ? "DONE" : "ONGOING" }}
        </span>
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { AuthKey, AxiosKey } from "../symbols/symbol";
import { injectStrict } from "../utils/injectStrict";
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import { useGlobal } from "@/providers/global";
import { computed } from "@vue/reactivity";

const global = useGlobal();

const lists = [
  { name: "Routing", key: "routing", done: true },
  { name: "Global Css", key: "global-css", done: true },
  { name: "Tailwind Css", key: "tailwind-css", done: true },
  { name: "Tailwind UI", key: "tailwind-ui", done: true },
  { name: "Axios", key: "axios", done: true },
  { name: "Strict Injector", done: true },
  { name: "Auth Set Token", key: "auth-token", done: true },
  { name: "Auth Login", key: "auth-login", done: true },
  { name: "Auth Logout", key: "auth-logout", done: true },
  { name: "Auth Route Guard", key: "auth-route", done: true },
  { name: "Auth State", key: "auth-route", done: true },
  { name: "swal", key: "swal", done: true },
  { name: "toast", key: "toast", done: true },
  { name: "icon", key: "icon", done: true },
  { name: "vs-code-plugins", key: "vs-code", done: true },
  { name: "eslint/prettier", key: "eslint/prettier", done: true },
  { name: "Global State", key: "global-state", done: true },
];

const http = injectStrict(AxiosKey);
const auth = injectStrict(AuthKey);
const router = useRouter();
const toast = useToast();
const handleClick = async (key?: string) => {
  if (!key) return;
  switch (key) {
    case "axios":
      http
        .get("/health")
        .then((r) => alert("fetch success"))
        .catch((e) => console.log(e));
      break;
    case "auth-token":
      // await auth.login({ username: "test", password: "asd123456" });
      // alert(auth.state.user.profile.username);
      break;
    case "auth-route":
      router.push({ name: "Lobby" });
      break;
    case "auth-logout":
      auth.logout();
      break;
    case "swal":
      Swal.fire("Hello World", "It's Just Works!", "success");
      break;
    case "toast":
      toast("I'm a toast!");
      break;
    default:
      break;
  }
};
</script>
