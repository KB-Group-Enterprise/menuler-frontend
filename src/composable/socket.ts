import { io, Manager } from "socket.io-client";
import env from '@/utils/helper/env';

export const useSocketIO = () => {
    // const socket = io('http://localhost:3505/client')
    const socket = io(`${env.VITE_API_URL.replace('/api')}/client`)

    // const manager = new Manager('https://menuler.me');
    // const manager = new Manager('https://localhost:3505');
    // const socket = manager.socket('client')
    return {
        socket,
    }
}