import redisClient from "../config/redis.js";
import { CHANNELS } from "../constants/channels.js";

export const publishOrderReadyEvent = async (payload) => {
    try {
        await redisClient.publish(
            CHANNELS.ORDER_EVENTS,
            JSON.stringify(payload)
        );

        console.log(
            `[Order Publisher] Published ORDER_READY for Order: ${payload.orderId}`
        );
    } catch (error) {
        console.error("[Order Publisher] Failed to publish event:", error);
        throw error;
    }
};