import { createClient } from "redis";



const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

redisClient.on("connect", () => {
    console.log("[Redis] Connecting...");
});

redisClient.on("ready", () => {
    console.log("[Redis] Ready");
});

redisClient.on("error", (error) => {
    console.error("[Redis Error]", error);
});

redisClient.on("end", () => {
    console.log("[Redis] Connection Closed");
});

export default redisClient;