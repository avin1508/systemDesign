import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import redisClient from "./config/redis.js";

import { initializeOrderSubscribers } from "./subscribers/order.subscriber.js";

const PORT = process.env.PORT || 3000;

const bootStrap = async () => {
    try {
        // Connect Redis
        await redisClient.connect();
        console.log("[Redis] Connected");

        // Register all Order Subscribers
        await initializeOrderSubscribers();
        console.log("[Subscriber] Order Subscribers Initialized");

        // Start Express Server
        app.listen(PORT, () => {
            console.log(`[Server] Listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("[Bootstrap Error]", error);
        process.exit(1);
    }
};

bootStrap();