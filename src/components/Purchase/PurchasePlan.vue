<template>
  <div class="min-h-full w-full gap-4 pb-4 flex flex-col justify-between">
    <div class="w-full space-y-4">
      <div class="mt-4 w-full flex flex-col items-center">
        <div class="text-2xl font-bold">{{ $t('purchase.topic.plan') }}</div>
        <div class="text-sm uppercase text-main-500">{{ $t('golfName') }}</div>
      </div>
      <div class="flex flex-col gap-2 w-full relative items-center">
        <label
          v-for="plan in plans"
          :key="plan.key"
          :for="plan.custom ? 'custom' : ''"
          class="w-full flex flex-row justify-start items-center gap-4 transition-all h-24 border-2 rounded-md pl-4 cursor-pointer hover:border-main-400 hover:bg-main-200 hover:text-main-600 relative"
          :class="
            plan.key === selected
              ? 'border-main-400 bg-main-200 text-main-600'
              : selected
              ? 'opacity-50 border-main-400 bg-main-200 text-main-600 hover:opacity-90'
              : 'border-main-400 bg-main-100 text-main-600'
          "
          @click="handleClick(plan)"
        >
          <input v-model="selected" type="radio" name="plan_radio" :value="plan.key" />
          <div class="text-xl font-bold">
            <i18n-t keypath="purchase.each" :plural="plan.each || customEach || 1">
              <template #n>
                <input
                  id="custom"
                  v-if="plan.custom"
                  v-model="customEach"
                  @input="(e:any) => (setPurchase(e.target?.value))"
                  type="number"
                  style="width: 4rem"
                  class="outline-none bg-transparent rounded-none border-b-2 border-main-600 font-bold"
                />
                <span v-else>
                  {{ plan.each }}
                </span>
              </template>
            </i18n-t>
          </div>
          <span class="absolute right-4 bottom-2 text-blue-800 text-xs">
            {{
              plan.key === 'custom'
                ? customEach
                  ? customEach >= 10
                    ? `~${numberWithCommas(getUsdCentFromTHBSatang(plans[0].price!))}$ (${numberWithCommas((plans[0].price! / 100))}THB) / ${$t('coupon')}`
                    : `~${numberWithCommas(getUsdCentFromTHBSatang(plans[1].price!))}$ (${numberWithCommas((plans[1].price! / 100))}THB) / ${$t('coupon')}`
                  : ''
                : `~${numberWithCommas(getUsdCentFromTHBSatang(plan.price!))}$ (${numberWithCommas((plan.price! / 100))}THB) / ${$t('coupon')}`
            }}
          </span>
        </label>
      </div>
    </div>
    <PurchaseButton :back="false" @next="next" :disabled="purchase.total <= 0" />
  </div>
</template>

<script setup lang="ts">
import { useEapi } from '@/providers';
import usePurchase from '@/store/purchase';
import { ref } from 'vue';
import PurchaseButton from './PurchaseButton.vue';
import numberWithCommas from '@/utils/helper/numberWithCommas';
const { setPurchase, purchase, setPriceConfig, getUsdCentFromTHBSatang } = usePurchase();

const emit = defineEmits(['next']);
const isLoading = ref(true);

const plans = ref<{ key: string; each?: number; price?: number; custom?: boolean }[]>([
  // { key: 'one', each: 1, price: 0 },
  // { key: 'ten', each: 10, price: 0 },
  // { key: 'custom', custom: true },
]);

const eapi = useEapi();
const fetchData = async () => {
  isLoading.value = true;
  const result = await eapi.payment.getPrice();
  if (result.data && result.success) {
    plans.value = [...result.data, { key: 'custom', custom: true }];
    setPriceConfig(result.data);
  }
  isLoading.value = false;
};

fetchData();

const selected = ref();

const customEach = ref();

const handleClick = (plan?: any) => {
  if (!plan.key) return;
  selected.value = plan.key;
  if (plan.each) setPurchase(plan.each);
  else setPurchase(customEach.value);
};

const next = () => {
  emit('next');
  // setPurchase(each.value);
};
</script>
