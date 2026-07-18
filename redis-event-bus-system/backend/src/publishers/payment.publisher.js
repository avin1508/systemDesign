import { CHANNELS } from "../constants/channels.js";
import { EVENT_TYPES } from "../constants/event-types.js";

import { createEvent } from "../events/create-event.js";
import { publishEvent } from "./publisher.js";

export const publishPaymentSuccess = async (payment) => {

    const event = createEvent({
        eventType: EVENT_TYPES.PAYMENT_SUCCESS,
        source: "payment-service",
        data: payment,
    });

    await publishEvent(
        CHANNELS.PAYMENT_SUCCESS,
        event
    );
};

export const publishPaymentFailed = async (payment) => {

    const event = createEvent({
        eventType: EVENT_TYPES.PAYMENT_FAILED,
        source: "payment-service",
        data: payment,
    });

    await publishEvent(
        CHANNELS.PAYMENT_FAILED,
        event
    );
};