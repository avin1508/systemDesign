import dotenv from "dotenv";
import http from "http";

import app from "./app.js";

import redisClient from "./config/redis.js";
import { initializeSocket } from "./config/socket.js";
import { initializePatternSubscriber } from "./subscribers/pattern.subscriber.js";
import { registerSocketHandlers } from "./socket/socket.handler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const bootStrap = async () => {
    try {

        // Connect Redis
        await redisClient.connect();
        console.log("[Redis] Connected");

        // Initialize Socket.IO with Redis adapter
        const io = await initializeSocket(server);
        registerSocketHandlers(io);
        console.log("[Socket.IO] Initialized");

        // Register Pattern Subscriber
        await initializePatternSubscriber();
        console.log("[Pattern Subscriber] Initialized");

        // Start HTTP Server
        server.listen(PORT, () => {
            console.log(`[Server] Listening on port ${PORT}`);
        });

    } catch (error) {

        console.error("[Bootstrap Error]", error);

        process.exit(1);
    }
};

bootStrap();
