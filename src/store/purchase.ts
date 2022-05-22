import { computed, reactive, ref } from 'vue';

const purchase = reactive({
  each: 0,
  total: 0,
});

const priceConfig = ref<{ id: number, key: string, each: number, price: number }[]>([]);

interface registerInterface {
  title: any;
  firstname: any;
  lastname: any;
  phone: any;
  email: any;
  fullName: any;
  [key: string]: any;
}

const register = reactive<registerInterface>({
  title: '',
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  fullName: '',
});

export default function usePurchase() {
  return {
    purchase: computed(() => purchase),
    priceConfig: computed(() => priceConfig),
    setPriceConfig: (config: any) => { priceConfig.value = config },
    setPurchase: (each: any = 0) => {
      if (priceConfig.value.length < 1) return 0
      purchase.each = each;
      const priceConfigItem = priceConfig.value.find(i => i.each <= each);
      if (!priceConfigItem) return 0;
      purchase.total = priceConfigItem.price * each;
    },
    getUsdCentFromTHBSatang: (satang: number) => {
      return ((satang / 100) / 34.5).toFixed(2);
    },
    register: computed(() => register),
    setRegister: (data: any) => {
      Object.assign(register, data);
      register.fullName = `${data.title}.${data.firstname} ${data.lastname}`;
    },
  };
}
