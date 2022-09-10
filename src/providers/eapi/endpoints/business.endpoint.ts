import { RestaurantListItem } from './../../../types/dto.types.d';
import { AllResturantResponseDto, postRegisterDto } from '../../../types/dto.types';
import { UseEapiConfig, EazyApi } from '../eapi';

export interface WebsiteConfig {
    isEnablePayment: boolean;
}

export function getBusinessEndpoint(eapi: EazyApi) {
    return {
        sendRegister(data: postRegisterDto,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'post',
                endpoint: '/auth/admin/register',
                data: data,
            },useConfig)
        },
        getMenu(menuId: string,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'get',
                endpoint: '/menu/:menuId',
                
            }, useConfig)
        },
        getResturant() {
            return eapi.useEazyApi<AllResturantResponseDto>({
                method: 'get',
                endpoint: '/restaurant/get/all'
            })
        },
        getResturantById(id: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi<{ restaurant: RestaurantListItem }>({
                method: 'get',
                endpoint: '/restaurant/:id',
                params: { id },
            }, useConfig)
        },
        addResturant(payload: any, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi<any>({
                method: 'post',
                endpoint: '/restaurant',
                data: payload
            }, useConfig);
        }
    }
}