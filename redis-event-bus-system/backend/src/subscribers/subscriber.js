import { createSubscriberClient } from "../config/redis.js";

export const patternSubscribe = async ({
    pattern,
    handler,
}) => {
    try {

        const subscriberClient = createSubscriberClient();

        await subscriberClient.connect();

        await subscriberClient.pSubscribe(
            pattern,
            async (message, channel) => {

                // Skip non-JSON messages (e.g. Socket.IO adapter binary protocol)
                let event;
                try {
                    event = JSON.parse(message);
                } catch {
                    return;
                }

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
