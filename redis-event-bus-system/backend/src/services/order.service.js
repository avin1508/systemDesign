import { publishOrderCreated } from "../publishers/order.publisher.js";

export const createOrder = async (payload) => {

    // Future
    // Save into DB

    await publishOrderCreated(payload);

    return payload;
};