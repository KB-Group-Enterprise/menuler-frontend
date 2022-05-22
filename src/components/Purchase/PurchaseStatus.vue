<template>
  <LayoutContainer>
    <Transition name="component-fade" mode="out-in">
      <BaseLoading v-if="loading" />
    </Transition>
    <Transition name="component-fade" mode="out-in">
      <div v-if="!loading" class="w-full space-y-4">
        <div class="mt-6 w-full text-center text-2xl font-bold">
          {{ $t('purchase.topic.status') }}
        </div>
        <!--  -->
        <div class="flex flex-col items-center space-y-1">
          <div
            class="w-full h-14 bg-gray-800 flex items-center justify-center text-2xl text-white font-bold"
          >
            {{ id }}
          </div>
          <!--  -->
          <div
            v-if="data.chargeStatus === 'failed'"
            class="p-2 px-2 text-white text-xs rounded-md bg-red-500"
          >
            {{ $t('purchase.status.failed') }}
          </div>
          <div
            v-if="data.chargeStatus === 'pending'"
            class="p-2 px-2 text-white text-xs rounded-md bg-gray-500 animate-shaked"
          >
            {{ $t('purchase.status.pending') }}
          </div>
          <div
            v-if="data.chargeStatus === 'reversed'"
            class="p-2 px-2 text-white text-xs rounded-md bg-gray-600"
          >
            {{ $t('purchase.status.reversed') }}
          </div>
          <div
            v-if="data.chargeStatus === 'successful'"
            class="p-2 px-2 text-white text-xs rounded-md"
            :class="
              data.isPaid
                ? data.isRedeemed || data.isRefunded
                  ? 'bg-orange-500'
                  : 'bg-blue-500'
                : 'bg-red-500'
            "
          >
            {{
              data.isPaid
                ? !data.isRefunded
                  ? data.isRedeemed
                    ? $t('purchase.status.redeemed')
                    : $t('purchase.status.noRedeemed')
                  : $t('purchase.status.isRefunded')
                : $t('purchase.status.noPaid')
            }}
          </div>
          <!--  -->
        </div>
        <!--  -->
        <div class="flex justify-center">
          <Vue3Lottie :animationData="GolfLottie" :height="180" :width="180" />
        </div>
        <!--  -->
        <div class="flex flex-col gap-4 w-full">
          <div class="w-full flex flex-col items-start">
            <label class="flex justify-between w-full text-base text-main-600">
              {{ $t('fullName') }} :
            </label>
            <div
              class="w-full p-2 outline-none transition-colors bg-main-100 rounded-md font-medium"
            >
              {{ data.title + '. ' + data.firstName + ' ' + data.lastName }}
            </div>
          </div>
        </div>
        <!--  -->
        <div class="flex flex-col gap-4 w-full">
          <div class="w-full flex flex-col items-start">
            <label class="flex justify-between w-full text-base text-main-600">
              {{ $t('email') }}
            </label>
            <div
              class="w-full p-2 outline-none transition-colors bg-main-100 rounded-md font-medium"
            >
              {{ data.email }}
            </div>
          </div>
        </div>
        <!--  -->
        <div class="flex flex-col gap-4 w-full">
          <div class="w-full flex flex-col items-start">
            <label class="flex justify-between w-full text-base text-main-600">
              {{ $t('ticket') }}
            </label>
            <div class="w-full p-2 outline-none transition-colors rounded-md font-medium flex">
              <div
                class="w-full p-2 outline-none transition-colors bg-main-100 rounded-md font-medium"
              >
                {{ $tc('purchase.each', data.numberOfTickets) }}
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <router-link to="/">
          <div class="w-full py-2 bg-green-500 text-white rounded-md mx-auto text-center font-bold">
            Purchase More
          </div>
        </router-link>
      </div>
    </Transition>
  </LayoutContainer>
</template>

<script setup lang="ts">
import axios from 'axios';
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';

import { Swaler } from '@/utils/helper/swaler';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseLoading from '../Base/BaseLoading.vue';
import { computed, ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import GolfLottie from '@/assets/lottie/golf.json';
import env from '@/utils/helper/env';
const router = useRouter();

const data = ref();
const loading = ref(true);
const { t } = useI18n();

const route = useRoute();
const id = computed<string>(() => (route.params.id as string) || '');

const fetchData = async () => {
  loading.value = true;
  const res = await axios.get(env.VITE_API_URL + '/ticket/purchase/' + id.value);
  if (res.data.data) {
    data.value = res.data.data;
    if (res.data.data.chargeStatus === 'pending') {
      setRefetchInterval();
    }
    loading.value = false;
  } else {
    await Swaler.error('Error');
    router.push('/');
  }
};
const intervalRef = ref<number>();
const intervalTime = 1000 * 30;
const setRefetchInterval = () => {
  if (intervalRef.value) clearInterval(intervalRef.value);
  intervalRef.value = setInterval(() => {
    fetchData();
  }, intervalTime);
};

fetchData();
</script>
