import {
    publishEmailNotification,
    publishSMSNotification,
} from "../../publishers/notification.publisher.js";

export const orderCreatedHandler = async (event) => {

    console.log(`
========================================
🟢 ORDER CREATED
----------------------------------------
`, event);

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

