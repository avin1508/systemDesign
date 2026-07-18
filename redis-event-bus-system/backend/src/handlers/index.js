import { CHANNELS } from "../constants/channels.js";

import { orderCreatedHandler } from "./order/order-created.handler.js";
import { orderReadyHandler } from "./order/order-ready.handler.js";
import { orderCancelledHandler } from "./order/order-cancelled.handler.js";

import { paymentSuccessHandler } from "./payment/payment-success.handler.js";
import { paymentFailedHandler } from "./payment/payment-failed.handler.js";

import { emailHandler } from "./notification/email.handler.js";
import { smsHandler } from "./notification/sms.handler.js";


export const eventHandlers = {
    [CHANNELS.ORDER_CREATED]: orderCreatedHandler,
    [CHANNELS.ORDER_READY]: orderReadyHandler,
    [CHANNELS.ORDER_CANCELLED]: orderCancelledHandler,
    [CHANNELS.PAYMENT_SUCCESS]: paymentSuccessHandler,
    [CHANNELS.PAYMENT_FAILED]: paymentFailedHandler,

    [CHANNELS.NOTIFICATION_EMAIL]: emailHandler,
    [CHANNELS.NOTIFICATION_SMS]: smsHandler,

}