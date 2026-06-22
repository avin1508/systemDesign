const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL
});

async function connectRedis() {

    try {

        await client.connect();

        console.log("Redis Connected 😈🔥");

    } catch (error) {

        console.log("Redis Connection Error 😭");

        console.log(error);
    }
}

module.exports = {
    client,
    connectRedis
};