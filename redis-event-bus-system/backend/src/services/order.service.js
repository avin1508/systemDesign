import { publishOrderCreated, publishOrderReady, publishOrderCancelled } from "../publishers/order.publisher.js";

export const createOrder = async (payload) => {

    // Future
    // Save into DB

    await publishOrderCreated(payload);

    return payload;
};


export const readyOrder = async (orderId) => {

    // Future
    // Update into DB

    const order = {
        orderId,
        status: "ready",
    };

    await publishOrderReady(order);

    return order;
};

export const cancelOrder = async (orderId) => {

    // Future
    // Update into DB

    const order = {
        orderId,
        status: "cancelled",
    };

    await publishOrderCancelled(order);

    return order;
};