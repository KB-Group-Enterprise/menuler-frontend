export interface postRegisterDto {
  email: string;
  password: string;
}

export interface RestaurantListItem {
  id: string;
  restaurantName: string;
  location: string;
  registerOn: string;
  isActivate: boolean;
  status: string;
  updatedAt: string;
  restaurantImage: string[];
}

export interface AllResturantResponseDto {
  restaurantList: RestaurantListItem[];
}

interface ProfieDto {
  email: string;
  restaurant?: any;
}

export interface MenuItem {
  id: string;
  foodName: string;
  category: string;
  description?: any;
  imageUrl: string;
  price: number;
  menuStatus: string;
  options: any[];
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
}

export interface SelectedFoodItem {
  menuId: string;
  foodName: string;
  selectedOptions: any[];
  foodOrderId: string;
}

export interface MenuState {
  modalMenuSelect: boolean;
  modalMenuBasket: boolean;
  menuItem: MenuItem;
  menuCount: number;
  menuBasket: any[];
  selectedFoodList: SelectedFoodItem[];
  menuList: any;
  tableToken: string;
  tableId: string;
  restaurantToken: string;
  username: string;
  userId: string;
}

interface BussinessMenuItem {
  id: string;
  foodName: string;
  category: string;
  description?: any;
  imageUrl: string;
  price: number;
  menuStatus: string;
  options: any[];
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
}

export interface UpdateClientOrderDto {
  orderId: string;
  clientState?: string;
  overallFoodStatus?: string;
  status?: string;
  deleteFoodOrderList?: string[]; // foodOrderId[]
  updateFoodOrderList?: { foodOrderId: string; status: string }[]; // ตัวนี้เพิ่มอาหารไม่ได้นะ
  transferTableId?: string;
  bill?: {
    billId: string;
    status: string;
  };
}

export interface BusinessSummaryDtoLeaderBoard {
  foodName: string;
  price: number;
  sales: number;
  income: number;
  category: string;
}

export interface BusinessSummaryDtoTotal {
  totalMenuCount: number;
  totalOrderCount: number;
  totalSales: number;
}

export interface BusinessSummaryDto {
  leaderBoard: BusinessSummaryDtoLeaderBoard[];
  topTen: BusinessSummaryDtoLeaderBoard[];
  total: BusinessSummaryDtoTotal;
}

export interface MenuOptionDto {
  id: string;
  name: string;
  description: string;
  price: number;
  menuId: string;
  foodOrderIds: any[];
}