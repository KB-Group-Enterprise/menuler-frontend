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