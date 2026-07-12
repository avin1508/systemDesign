import { publishOrderReadyEvent } from "../publisher/order.publisher.js";

export const markOrderAsReadyService = async (orderId) => {

    // TODO:
    // Database Update
    // await Order.findByIdAndUpdate(...)

    const eventPayload = {
        event: "ORDER_READY",
        orderId,
        status: "READY",
        timestamp: new Date().toISOString(),
    };

    await publishOrderReadyEvent(eventPayload);

    return eventPayload;
};