import { MenuItem, MenuOptionDto, MenuState, SelectedFoodItem } from "@/types/dto.types";
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
export const optionPools = computed<MenuOptionDto[]>(() => {
    return menuList.value.menu.map((i: any) => i.options).flat(1);
    // return menuList.value;
})
export const findUserByUserId = (userId: string) => {
    const sessionData = notiTableData.value;
    if (sessionData && sessionData.usernameInRoom) {
        return sessionData.usernameInRoom.find((i: any) => i.id === userId );
    } else {
        return null;
    }
}
export const findOptionsByIdList = (optionIds: string[]) => {
    const list: MenuOptionDto[] = [];
    optionIds.forEach(optionId => {
        const option = optionPools.value.find(i => i.id === optionId);
        if (option) {
            list.push(option)
        }
    })
    return list;
}
export const findMenuById = (id: any) => {
    // console.log(menuList.value.menu);
    return menuList.value.menu.find((x: any) => x.id === id);
};
export const selectedFoodPrice = computed(() => {
    if (!selectedFoodList.value.length) return 0;
    let total = 0;
    selectedFoodList.value.forEach(foodItem => {
        const menu = findMenuById(foodItem.menuId);
        if (menu) {
            total += menu.price;
        }
        const options: MenuOptionDto[] = findOptionsByIdList(foodItem.selectedOptions);
        if (options && options.length) {
            options.forEach(i => {
                total += i.price;
            })
        }
    });
    return total;
})
export const orderedFoodPrice = computed(() => {
    if (!notiTableData.value) return 0;
    if (!notiTableData.value.order) return 0;
    if (!notiTableData.value.order.foodOrderList) return 0;
    let total = 0;
    notiTableData.value.order.foodOrderList.forEach((foodItem: any) => {
        const menu = findMenuById(foodItem.menuId);
        if (menu) {
            total += menu.price;
        }
        const options: MenuOptionDto[] = findOptionsByIdList(foodItem.optionIds);
        if (options && options.length) {
            options.forEach(i => {
                total += i.price;
            })
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
