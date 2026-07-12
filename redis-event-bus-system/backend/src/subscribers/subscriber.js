import redisClient from "../config/redis.js";

export const subscribe = async ({
    channel,
    handler,
}) => {
    try {

        await redisClient.subscribe(channel, async (message) => {

            const event = JSON.parse(message);

            console.log(`
========================================
📥 Event Received
----------------------------------------
Channel    : ${channel}
Event Type : ${event.eventType}
Event ID   : ${event.eventId}
========================================
`);

            await handler(event);

        });

        console.log(`[Subscriber] Listening on ${channel}`);

    } catch (error) {

        console.error("[Subscriber Error]", error);

        throw error;
    }
};