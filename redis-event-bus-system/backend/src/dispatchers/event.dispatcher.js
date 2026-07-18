import { eventHandlers } from "../handlers/index.js";

export const eventDispatcher = async ({
    channel,
    event,
}) => {

    const handler = eventHandlers[channel];

    if (!handler) {
        console.warn(`[Event Dispatcher] No handler found for channel: ${channel}`);
        return;
    }

    await handler(event);
};

