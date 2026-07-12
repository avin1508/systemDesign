import redisClient from "../config/redis.js";

const publishMessage = async () => {
    await redisClient.publish(
        "order-channel",
        JSON.stringify({
            orderId: 101,
            status: "READY"
        })
    );

    console.log("Event Published");
};

export default publishMessage;