import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || "redis",
        port: process.env.REDIS_PORT || 6379
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

export default redisClient;