import { Swaler } from '@/utils/helper/swaler';
import { AxiosInstance, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { http } from '../http';
import { getBusinessEndpoint } from './endpoints/business.endpoint';
import { getPaymentEndpoint } from './endpoints/payment.endpoint';

type CreateEapiConfigBase = {
  method: 'get' | 'post' | 'patch' | 'put' | 'delete';
  endpoint: string;
  params?: Record<string, string | number>;
};

type DataConfig = { data?: Record<any, any>; query?: never };
type QueryConfig = {
  query?: { params: Record<string, string | number | undefined> };
  data?: never;
};

export type CreateEapiConfig = CreateEapiConfigBase & (DataConfig | QueryConfig);

export type UseEapiConfig = {
  noticeSuccess?: boolean;
  noticeError?: boolean;
  mode?: 'swal' | 'toast';
  useTranslator?: boolean;
  overrideSuccessMessage?: boolean;
  overrideErrorMessage?: boolean;
  fallbackMessageSuccess?: string;
  fallbackMessageError?: string;
  useTransalatorWhenInvalid?: boolean;
};

export type ResponseTemplate = {
  statusCode: number;
  isSuccess?: boolean;
  data?: any;
  message?: string;
};
// --------------- MAIN ENDPOINT INDEX ------------- //
export function initEapi() {
  const eapi: EazyApi = new EazyApi();
  return {
    healthCheck: () =>
      eapi.useEazyApi({ method: 'get', endpoint: '/healthz' }, { noticeError: false }),
    payment: getPaymentEndpoint(eapi),
    business: getBusinessEndpoint(eapi),
  };
}
export class EazyApi {
  private readonly prefix?: string;
  private readonly defaultUseConfig: UseEapiConfig = {
    noticeSuccess: false,
    noticeError: true,
    mode: 'swal',
    useTranslator: true,
    overrideSuccessMessage: false,
    overrideErrorMessage: false,
    useTransalatorWhenInvalid: true,
  };

  constructor(prefix?: string) {
    this.prefix = prefix;
  }

  private endpointParser(endpoint: string, params: CreateEapiConfig['params']): string {
    if (!params) return endpoint;
    let parsedString = endpoint;
    Object.entries(params).forEach(([k, v]) => {
      parsedString = parsedString.replace(`:${k}`, encodeURIComponent(v));
    });
    return parsedString;
  }

  private messageTransalater(status: number): string {
    switch (status) {
      case 200:
        return 'ok';
      case 201:
        return 'สร้างสำเร็จ';
      case 202:
        return 'ยอมรับแล้ว';
      case 400:
        return 'ข้อมูลผิดพลาด';
      case 401:
        return 'ไม่มีสิทธิ์เข้าถึง';
      case 403:
        return 'ไม่สามารถเข้าถึง';
      case 409:
        return 'ข้อมูลไม่ตรงกัน';
      case 410:
        return 'ข้อมูลหาย';
      case 418:
        return 'เซิฟวอร์กำลังชงชา';
      case 500:
        return 'เกิดปัญหาทางเซิฟเวอร์';
      default:
        return 'ผิดพลาด';
    }
  }

  public interceptor<T>(res: AxiosResponse): {
    success: boolean;
    data?: T;
    message?: string;
  } {
    const data: ResponseTemplate = res.data;
    if (data && ((data.statusCode >= 200 && data.statusCode <= 300) || data.isSuccess)) {
      return { success: true, data: data.data, message: data.message };
    } else {
      return {
        success: false,
        message: data.message,
      };
    }
  }

  public axiosWrapper(
    axios: AxiosInstance,
    { method, endpoint, query, data, params }: CreateEapiConfig
  ): Promise<AxiosResponse> {
    return axios[method](
      this.endpointParser(this.prefix ?? '' + endpoint, params),
      data ?? query
    ).catch((err) => err.response);
  }

  private async runEapi<T>(createConfig: CreateEapiConfig, customUseConfig?: UseEapiConfig) {
    const useConfig = { ...this.defaultUseConfig, ...customUseConfig };
    const res = await this.axiosWrapper(http, createConfig);
    const result = this.interceptor<T>(res);
    // console.log(result);
    if (result.success) {
      if (useConfig.noticeSuccess) {
        const successMessage = useConfig.overrideSuccessMessage
          ? useConfig.fallbackMessageSuccess ??
            result.message ??
            this.messageTransalater(res.status)
          : result.message ??
            useConfig.fallbackMessageSuccess ??
            this.messageTransalater(res.status);
        Swaler.success(successMessage);
      }
    } else if (useConfig.noticeError) {
      const errorMessage = useConfig.overrideErrorMessage
        ? useConfig.fallbackMessageError ?? result.message ?? this.messageTransalater(res.status)
        : result.message ?? useConfig.fallbackMessageError ?? this.messageTransalater(res.status);
      Swaler.error(errorMessage);
    }
    return result;
  }

  public useEazyApi<T = any>(createConfig: CreateEapiConfig, useConfig?: UseEapiConfig) {
    return this.runEapi<T>(createConfig, useConfig);
  }
}
