<template>
  <div class="w-full flex flex-col border-t-2 border-main-300">
    <div class="p-4 py-6 flex flex-col w-full justify-between items-end bg-main-100 rounded-b-md">
      <div class="flex flex-nowrap items-center gap-2">
        <div class="font-medium text-xl">{{ $t('total') }}</div>
        <div v-if="each" class="text-sm">({{ $tc('purchase.each', each) }})</div>
      </div>
      <div class="flex flex-col items-end text-2xl">
        <!-- {{ $n(purchase.total, "currency") }} -->
        <span class="text-2lg font-bold"
          >{{ numberWithCommas(getUsdCentFromTHBSatang(purchase.total)) }}$</span
        >
        <span class="text-lg font-normal">({{ numberWithCommas(purchase.total / 100) }} THB)</span>
      </div>
    </div>
    <div class="w-full flex gap-2">
      <BaseButton
        v-if="back"
        :big="true"
        @click="$emit('back')"
        color="bg-slate-500 text-slate-50 hover:bg-slate-400 disabled:bg-main-400 disabled:text-main-600"
      >
        {{ $t('back') }}
      </BaseButton>
      <BaseButton :primary="primary" :big="true" :disabled="disabled" @click="$emit('next')">
        {{ nextText ? nextText : $t('next') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../Base/BaseButton.vue';
import usePurchase from '@/store/purchase';
import { computed } from 'vue';
import numberWithCommas from '@/utils/helper/numberWithCommas';
const { purchase, getUsdCentFromTHBSatang } = usePurchase();

const props = defineProps({
  back: {
    type: Boolean,
    required: false,
    default: true,
  },
  nextText: {
    type: String,
    required: false,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  primary: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const each = computed(() => Number(purchase.value.each));
</script>
