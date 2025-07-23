// src/lib/socket.ts
import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export function initSocket(userId: number) {
  // If socket exists but is disconnected, clean it up
  if (socket && !socket.connected) {
    socket.disconnect();
    socket = null;
  }
  
  if (!socket) {
    socket = io("http://localhost:4000", {
      withCredentials: true,
      query: { userId },
      transports: ['websocket', 'polling'], // Fallback transports
      timeout: 5000, // 5 second timeout
      forceNew: false,
    });
    
    // Handle connection errors at the socket level
    socket.on('connect_error', (error) => {
      console.error('Socket connection failed:', error);
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        socket?.connect();
      }
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
