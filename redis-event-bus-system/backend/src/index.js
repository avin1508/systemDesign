import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import redisClient from "./config/redis.js";

import { initializePatternSubscriber } from "./subscribers/pattern.subscriber.js";

const PORT = process.env.PORT || 3000;

const bootStrap = async () => {
    try {

        // Connect Redis
        await redisClient.connect();
        console.log("[Redis] Connected");

        // Register Pattern Subscriber
        await initializePatternSubscriber();
        console.log("[Pattern Subscriber] Initialized");

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