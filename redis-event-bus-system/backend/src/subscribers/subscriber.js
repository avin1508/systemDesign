import redisClient from "../config/redis.js";

export const patternSubscribe = async ({
    pattern,
    handler,
}) => {
    try {

        await redisClient.pSubscribe(
            pattern,
            async (message, channel) => {

                const event = JSON.parse(message);

                console.log(`
========================================
📥 Pattern Event Received
----------------------------------------
Pattern    : ${pattern}
Channel    : ${channel}
Event Type : ${event.eventType}
Event ID   : ${event.eventId}
========================================
`);

                await handler({
                    channel,
                    event,
                });

            }
        );

        console.log(`[Pattern Subscriber] Listening on ${pattern}`);

    } catch (error) {

        console.error("[Pattern Subscriber Error]", error);

        throw error;
    }
};