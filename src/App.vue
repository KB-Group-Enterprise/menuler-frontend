<template>
  <layout-default />
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue';
import { computed, watch } from '@vue/runtime-dom';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import LayoutDefault from './layouts/LayoutDefault.vue';
import { useAuth } from './providers/auth';
import { useGlobal } from './providers/global';
import { Swaler } from './utils/helper/swaler';
const auth = useAuth();
const route = useRoute();
const toast = useToast();
const global = useGlobal();

const currentTime = computed(() => global.state.currentDateTime);
</script>
