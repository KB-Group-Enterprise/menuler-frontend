import { io, Manager } from "socket.io-client";
export const useSocketIO = () => {
    const socket = io('http://localhost:3505/client')
    // const manager = new Manager('https://menuler.me');
    // const manager = new Manager('https://localhost:3505');
    // const socket = manager.socket('client')
    return {
        socket,
    }
}