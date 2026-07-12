import redisClient from "../config/redis.js";

export const publishEvent = async (channel, event) => {
    try {
        const subscribersCount = await redisClient.publish(
            channel,
            JSON.stringify(event)
        );

        console.log(`
========================================
📢 Event Published
----------------------------------------
Channel      : ${channel}
Subscribers  : ${subscribersCount}
Event Type   : ${event.eventType}
Event ID     : ${event.eventId}
========================================
`);

        return subscribersCount;

    } catch (error) {
        console.error("[Publisher Error]", error);
        throw error;
    }
};