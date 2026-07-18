import { publishPaymentSuccess, publishPaymentFailed } from "../publishers/payment.publisher.js";

export const paymentSuccess = async (payload) => {

    // Future:
    // Save payment in DB
    // Verify transaction
    // Update order status

    await publishPaymentSuccess(payload);
    return payload;
}


export const paymentFailed = async (payload) => {
    // Future:
    // Save payment in DB
    // Verify transaction
    // Update order status

    await publishPaymentFailed(payload);
    return payload;
}