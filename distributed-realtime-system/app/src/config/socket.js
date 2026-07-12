import { Server } from "socket.io";

let io = null;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.SOCKET_CORS_ORIGIN,
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`[Socket] Client Connected : ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`[Socket] Client Disconnected : ${socket.id}`);
        });
    });

    console.log("[Socket] Socket.IO Initialized");

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized.");
    }

    return io;
};