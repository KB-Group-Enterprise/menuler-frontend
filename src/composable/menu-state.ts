import { MenuItem, MenuState, SelectedFoodItem } from "@/types/dto.types";
import { computed, reactive, ref } from "vue";

export const modalMenuSelect = ref<boolean>(false)
export const modalMenuBasket = ref<boolean>(false)
export const modalCheckout = ref<boolean>(false)
export const modalMenuOrder = ref<boolean>(false)
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
export const restaurantId = ref('')
export const clientGroupId = ref('')
export const notiTableData = ref<Record<string,any>>({});
export const findMenuById = (id: any) => {
    // console.log(menuList.value.menu);
    return menuList.value.menu.find((x: any) => x.id === id);
};
export const selectedFoodPrice = computed(() => {
    if (!selectedFoodList.value.length) return 0;
    let total = 0;
    selectedFoodList.value.forEach(i => {
        const menu = findMenuById(i.menuId);
        if (menu) {
            total += menu.price;
        }
    });
    return total;
})

// export const menuState = reactive<MenuState>({
//     modalMenuSelect : false,
//     modalMenuBasket : false,
//     menuItem : {} as any,
//     menuCount : 1,
//     menuBasket : [],
//     selectedFoodList : [],
//     menuList : {},
//     tableToken : '',
//     tableId : '',
//     restaurantToken : '',
//     username : '',
//     userId : '',
// })
