import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

let io;

export const initializeSocket = async (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    const pubClient = createClient({
        socket: {
            host: process.env.REDIS_HOST || "redis",
            port: Number(process.env.REDIS_PORT || 6379),
        },
    });

    const subClient = pubClient.duplicate();

    pubClient.on("error", (error) => {
        console.error("[Socket.IO Redis Pub] Error", error);
    });

    subClient.on("error", (error) => {
        console.error("[Socket.IO Redis Sub] Error", error);
    });

    await pubClient.connect();
    await subClient.connect();

    io.adapter(createAdapter(pubClient, subClient));
    console.log("[Socket.IO] Redis Adapter Connected");

    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized. Call initializeSocket first.");
    }

    return io;
};