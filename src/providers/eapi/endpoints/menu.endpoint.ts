import { UseEapiConfig,EazyApi} from '../eapi';
import { boolean } from "yup"

export interface WebsiteConfig {
    isEnablePayment: boolean;
}

export function getMenuEndpoint(eapi: EazyApi) {
    return {
        getRestaurantByToken(token:any,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'get',
                endpoint: '/table/token/:token',
                params:{token}
            },useConfig)
        },
        getMenuByToken(token:any,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'get',
                endpoint: '/menu/restaurant/:token',
                params:{token}
            },useConfig)
        },
        createOrder(payload:any,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'post',
                endpoint: '/order/create',
                data: payload 
            },useConfig)
        },
    }
}