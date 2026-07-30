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

// Dedicated subscriber client — must be separate from the main client
// so that Socket.IO adapter messages (binary protocol) don't crash
// the JSON.parse in the pattern subscriber.
export const createSubscriberClient = () => {
    const client = redisClient.duplicate();

    client.on("error", (error) => {
        console.error("[Redis Subscriber Error]", error);
    });

    client.on("end", () => {
        console.log("[Redis Subscriber] Connection Closed");
    });

    return client;
};

export default redisClient;
