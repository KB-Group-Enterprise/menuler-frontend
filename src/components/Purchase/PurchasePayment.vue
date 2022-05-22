<template>
  <Transition name="component-fade" mode="out-in">
    <div class="min-h-full w-full gap-4 pb-4 flex flex-col justify-between">
      <BaseLoading v-if="loading" />
      <div class="w-full space-y-4">
        <div class="mt-6 w-full text-center text-2xl font-bold">
          {{ $t('purchase.topic.payment') }}
        </div>
        <div class="flex flex-col gap-4 w-full">
          <div v-for="field in fields" :key="field" class="w-full flex flex-col items-start">
            <label class="flex justify-between w-full text-base text-main-600">
              {{ $t(field) }} :
            </label>
            <div
              class="w-full p-2 outline-none transition-colors bg-main-100 rounded-md font-medium"
            >
              {{ register[field] }}
            </div>
          </div>
        </div>
      </div>
      <label
        for="agree"
        class="w-full flex flex-row justify-start items-center gap-4 cursor-pointer"
      >
        <input id="agree" v-model="agree" type="checkbox" />
        <i18n-t keypath="purchase.agree" tag="div" class="text-sm">
          <a href="http://bangpragolfclub.com/policy" target="_blank" class="underline">{{
            $t('purchase.policy')
          }}</a>
        </i18n-t>
      </label>
      <div class="text-right text-red-500">{{ $t('purchase.secure') }}</div>
      <PurchaseButton
        :primary="true"
        :disabled="!agree"
        @back="$emit('back')"
        :next-text="$t('payOmise')"
        @next="payment"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import usePurchase from '@/store/purchase';
import env from '@/utils/helper/env';
import { Swaler } from '@/utils/helper/swaler';
import axios from 'axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import PurchaseButton from './PurchaseButton.vue';
import BaseLoading from '../Base/BaseLoading.vue';
const { register, purchase } = usePurchase();
const router = useRouter();
const { t } = useI18n();

const fields = ['fullName', 'phone', 'email'];

const windowAny: any = window;
const loading = ref(false);
const agree = ref(false);

windowAny.OmiseCard.configure({
  publicKey: env.VITE_OMISE_PUBLIC,
  omiseVersion: '2015-09-10',
});

const currency = 'THB';

const openPayment = () => {
  const amount = purchase.value.total;
  windowAny.OmiseCard.open({
    amount: amount,
    currency: currency,
    defaultPaymentMethod: 'credit_card',
    onCreateTokenSuccess: async (nonce: any) => {
      loading.value = true;
      // callback
      const resp = await axios.post(env.VITE_API_URL + '/ticket/charge', {
        amount: amount,
        numberOfTickets: purchase.value.each,
        currency: currency,
        redirectUrl: window.location.origin + '/coupon',
        tokenId: nonce,
        email: register.value.email,
        firstName: register.value.firstname,
        lastName: register.value.lastname,
        titleName: register.value.title,
        mobileNumber: register.value.phone,
      });
      loading.value = false;
      const data = resp?.data?.data || {};
      if (data.isPaymentSuccess && data.sourceId) {
        await Swaler.success(t('purchase.checkemail'));
        router.push('/coupon/' + data.sourceId);
        // windowAny.location.reload();
      } else if (data.redirect) window.location.href = data.redirectUrl;
      else Swaler.error(data.err.message || 'Error');
    },
  });
};

const payment = (e: any) => {
  openPayment();
};
</script>
