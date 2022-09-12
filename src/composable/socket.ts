import { io, Manager } from "socket.io-client";
import env from '@/utils/helper/env';

export const useSocketIO = () => {
    let socket;
    if (env.VITE_USE_LOCAL) {
        socket = io('http://localhost:3505/client')
    } else {
        socket = io(`${env.VITE_API_URL}`.replace('/api','/client'))
    }
    return {
        socket,
    }
}

export const useSocketIOWithAuth = (token: string) => {
    console.log(token)
    const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            }
        }
    };
    let socket;
    
    if (env.VITE_USE_LOCAL) {
        socket = io('http://localhost:3505/client', socketOptions)
    } else {
        socket = io(`${env.VITE_API_URL}`.replace('/api','/client'), socketOptions)
    }
    return {
        socket,
    }

}