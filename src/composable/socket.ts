import { io, Manager } from "socket.io-client";
export const useSocketIO = () => {
    const socket = io('http://172.21.10.102:3505/client')
    // const socket = io('https://menuler.me/client')

    // const manager = new Manager('https://menuler.me');
    // const manager = new Manager('https://localhost:3505');
    // const socket = manager.socket('client')
    return {
        socket,
    }
}