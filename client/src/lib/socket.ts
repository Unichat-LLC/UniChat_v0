// src/lib/socket.ts
import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export function initSocket(userId: number) {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL!, {
      withCredentials: true,
      query: { userId },
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
}
