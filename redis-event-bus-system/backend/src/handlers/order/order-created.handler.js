import crypto from "crypto";

import {
    publishEmailNotification,
    publishSMSNotification,
} from "../../publishers/notification.publisher.js";

import { getIo } from "../../config/socket.js";

export const orderCreatedHandler = async (event) => {

    console.log(`
========================================
🟢 ORDER CREATED
----------------------------------------
`, event);

    const io = getIo();

    console.log(
        `[${process.env.SERVER_NAME}] Broadcasting order.created`
    );

    // Emit real-time event to all connected clients
    io.emit("order.created", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

    const order = event.data;

    // Publish Email Event
    await publishEmailNotification({
        notificationId: crypto.randomUUID(),
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: "avinash@example.com",
        subject: "Order Confirmation",
        message: `Hi ${order.customerName}, your order has been placed successfully.`,
    });

    // Publish SMS Event
    await publishSMSNotification({
        notificationId: crypto.randomUUID(),
        orderId: order.orderId,
        customerName: order.customerName,
        phoneNumber: "+919876543210",
        message: `Hi ${order.customerName}, your order has been placed successfully.`,
    });

};