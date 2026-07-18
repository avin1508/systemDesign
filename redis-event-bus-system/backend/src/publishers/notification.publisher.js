import { CHANNELS } from "../constants/channels.js";
import { EVENT_TYPES } from "../constants/event-types.js";

import { createEvent } from "../events/create-event.js";
import { publishEvent } from "./publisher.js";

export const publishEmailNotification = async (payload) => {

    const event = createEvent({
        eventType: EVENT_TYPES.EMAIL_SENT,
        source: "notification-service",
        data: payload,
    });

    await publishEvent(
        CHANNELS.NOTIFICATION_EMAIL,
        event
    );
};

export const publishSMSNotification = async (payload) => {

    const event = createEvent({
        eventType: EVENT_TYPES.SMS_SENT,
        source: "notification-service",
        data: payload,
    });

    await publishEvent(
        CHANNELS.NOTIFICATION_SMS,
        event
    );
};