import { UseEapiConfig } from './../eapi';
import { EazyApi } from "../eapi";

export function getTableEndpoint(eapi: EazyApi) {
    return {
        postCreateTable(tables: any[], useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'post',
                endpoint: '/table',
                data: {
                    tables
                }
            }, useConfig)
        },
        getTablesByRestaurantId(id: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'get',
                endpoint: '/table/restaurant/:id',
                params: {
                    id
                }
            }, useConfig)
        },
        updateTableById(id: string,payload: any, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'put',
                endpoint: '/table/:id',
                params: {
                    id
                },
                data: {
                    payload
                }
            }, useConfig)
        },
        deleteTableById(id: string, useConfig?: UseEapiConfig) {
            return eapi.useEazyApi({
                method: 'delete',
                endpoint: '/table/:id',
                params: {
                    id
                },
            }, useConfig)
        },
    }
}