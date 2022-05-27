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
        }
    }
}