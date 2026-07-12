import dotenv from "dotenv";

dotenv.config();

import server from "./config/server.js";
import redisClient from "./config/redis.js";
import { initializeSocket } from "./config/socket.js";

const bootstrap = async () => {
    try {
        // Connect Redis
        await redisClient.connect();
        console.log("[Redis] Connected");

        // Initialize Socket.IO
        initializeSocket(server);

        // Start HTTP Server
        server.listen(process.env.PORT, () => {
            console.log(
                `[${process.env.SERVER_NAME}] Server running on port ${process.env.PORT}`
            );
        });

    } catch (error) {
        console.error("[Bootstrap Error]", error);
        process.exit(1);
    }
};

bootstrap();