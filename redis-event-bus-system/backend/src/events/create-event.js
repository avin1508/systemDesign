import crypto from 'crypto';

export const createEvent = ({ eventType, source, data }) => {
    return {
        eventId: crypto.randomUUID(),
        eventType,
        source,
        data,
        timestamp: new Date().toISOString(),
        version: 1,
    };
};