import { CHANNELS } from "../constants/channels.js";
import { EVENT_TYPES } from "../constants/event-types.js";

import { createEvent } from "../events/create-event.js";
import { publishEvent } from "./publisher.js";

export const publishOrderCreated = async (order) => {

    const event = createEvent({
        eventType: EVENT_TYPES.ORDER_CREATED,
        source: "order-service",
        data: order,
    });

    await publishEvent(
        CHANNELS.ORDER_CREATED,
        event
    );
};

export const publishOrderReady = async (order) => {

    const event = createEvent({
        eventType: EVENT_TYPES.ORDER_READY,
        source: "order-service",
        data: order,
    });

    await publishEvent(
        CHANNELS.ORDER_READY,
        event
    );
};

export const publishOrderCancelled = async (order) => {

    const event = createEvent({
        eventType: EVENT_TYPES.ORDER_CANCELLED,
        source: "order-service",
        data: order,
    });

    await publishEvent(
        CHANNELS.ORDER_CANCELLED,
        event
    );
};