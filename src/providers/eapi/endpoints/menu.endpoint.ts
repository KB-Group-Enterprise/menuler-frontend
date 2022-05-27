import { UseEapiConfig } from '../eapi';
import { boolean } from "yup"
import { EazyApi } from "../eapi"

export interface WebsiteConfig {
    isEnablePayment: boolean;
}

export function getPaymentEndpoint(eapi: EazyApi) {
    return {
        getPrice(useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'get',
                endpoint: '/ticket/price',
            },useConfig)
        },
        getConfig(useConfig?: UseEapiConfig) {
            return eapi.useEazyApi<WebsiteConfig>({
                method: 'get',
                endpoint: '/ticket/config',
            },useConfig)
        },
        verifyPassword(password: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi<boolean>({
                method: 'post',
                endpoint: '/ticket/verify/password',
                data: { password }
            },useConfig)
        },
        findStatusByEmail(password: string, email: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi<any[]>({
                method: 'post',
                endpoint: '/ticket/status/:email',
                params: { email },
                data: { password }
            })
        }
    }
}