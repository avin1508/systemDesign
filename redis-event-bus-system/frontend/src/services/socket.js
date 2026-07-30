import { io } from "socket.io-client";

// Connect to the same origin the page was loaded from.
// When served through Nginx (port 80) this works automatically.
// For direct Vite dev access, the Vite proxy forwards /socket.io to Nginx.
const socketUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;

let socket = null;
let listeners = [];

export const connectSocket = () => {
  if (socket) return socket;

  socket = io(socketUrl, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });

  socket.on("connect", () => {
    console.log("[Socket.IO] Connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("[Socket.IO] Disconnected:", reason);
  });

  // Re-register all listeners after a reconnect
  socket.on("connect", () => {
    listeners.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });
  });

  return socket;
};

export const onEvent = (eventName, handler) => {
  if (!socket) return;

  socket.on(eventName, handler);

  // Keep track so we can re-register after reconnect
  listeners.push({ event: eventName, handler });
};

export const offEvent = (eventName, handler) => {
  if (!socket) return;
  socket.off(eventName, handler);
  listeners = listeners.filter(
    (l) => l.event !== eventName || l.handler !== handler
  );
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    listeners = [];
  }
};

export const getSocket = () => socket;
