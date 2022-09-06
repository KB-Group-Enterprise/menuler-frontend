import { MenuItem, SelectedFoodItem } from "@/types/dto.types";
import { ref } from "vue";

export const modalMenuSelect = ref<boolean>(false)
export const modalMenuBasket = ref<boolean>(false)
export const menuItem = ref<MenuItem>({} as any)
export const menuCount = ref<number>(1)
export const menuBasket = ref<any[]>([])
export const selectedFoodList = ref<SelectedFoodItem[]>([])
export const menuList = ref<any>({})
export const tableToken = ref('')
export const tableId = ref('')
export const restaurantToken = ref('')
export const username = ref('');
export const userId = ref('');
