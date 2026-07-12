import { subscribe } from "./subscriber.js";

import { CHANNELS } from "../constants/channels.js";

import { orderCreatedHandler } from "../handlers/order/order-created.handler.js";
import { orderReadyHandler } from "../handlers/order/order-ready.handler.js";
import { orderCancelledHandler } from "../handlers/order/order-cancelled.handler.js";

export const initializeOrderSubscribers = async () => {

    await subscribe({
        channel: CHANNELS.ORDER_CREATED,
        handler: orderCreatedHandler,
    });

    await subscribe({
        channel: CHANNELS.ORDER_READY,
        handler: orderReadyHandler,
    });

    await subscribe({
        channel: CHANNELS.ORDER_CANCELLED,
        handler: orderCancelledHandler,
    });

};