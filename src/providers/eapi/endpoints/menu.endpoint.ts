import { UseEapiConfig,EazyApi} from '../eapi';
import { boolean } from "yup"
import { BussinessMenuItem } from '@/types/dto.types';

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
        getMenuByRestaurantId(id:string,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi<{ menu: BussinessMenuItem[] }>({
                method: 'get',
                endpoint: '/menu/restaurant/:id',
                params: {id}
            },useConfig)
        },
        createOrder(payload:any,useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'post',
                endpoint: '/order/create',
                data: payload 
            },useConfig)
        },
        adminCreateMenu(payload: any, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'post',
                endpoint: '/menu',
                data: payload 
            },useConfig)
        },
        adminUpdateMenu(id: string, payload: any, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'put',
                endpoint: '/menu/:id',
                params: {
                    id: id
                },
                data: payload 
            },useConfig)
        },
        deleteMenu(id: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'delete',
                endpoint: '/menu/:id',
                params: {
                    id: id
                },
            },useConfig)
        },
        getMenuByMenuId(id: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'get',
                endpoint: '/menu/:id',
                params: {
                    id: id
                }
            },useConfig)
        }
    }
}