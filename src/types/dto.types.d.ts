export interface postRegisterDto {
    email: string,
    password: string,
}

export interface RestaurantListItem {
    id: string;
    restaurantName: string;
    location: string;
    registerOn: string;
    isActivate: boolean;
    status: string;
    updatedAt: string;
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
  selectedOption: any[];
  foodOrderId: string;
}