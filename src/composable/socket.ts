import { io, Manager } from "socket.io-client";
import env from '@/utils/helper/env';

export const useSocketIO = () => {
<<<<<<< HEAD
    // const socket = io('http://localhost:3505/client')
    const socket = io(`${env.VITE_API_URL.replace('/api')}/client`)
=======
    const socket = io('http://172.21.10.102:3505/client')
    // const socket = io('https://menuler.me/client')
>>>>>>> 5c705c667adb4bbeca432dc12f4ac51f785ac2f9

    // const manager = new Manager('https://menuler.me');
    // const manager = new Manager('https://localhost:3505');
    // const socket = manager.socket('client')
    return {
        socket,
    }
}