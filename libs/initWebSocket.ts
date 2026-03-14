import { io } from "socket.io-client";

export const initSocketConnections = (token: string) => {
  return io(process.env.WEBSOCKET_BASE_URL!, {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  });
};
