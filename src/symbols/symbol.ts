import { InjectionKey } from 'vue';
import { AxiosInstance } from 'axios';
import { auth } from '../providers/auth';
import { global } from '../providers/global';
import { initEapi } from '../providers/eapi/eapi';

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol('http');
export const AuthKey: InjectionKey<typeof auth> = Symbol('auth');
export const GlobalKey: InjectionKey<typeof global> = Symbol('global');
export const EapiKey: InjectionKey<ReturnType<typeof initEapi>> = Symbol('eapi');
