import { createClient } from 'redis';

const redisClient = createClient({
    socket:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

//connection established
redisClient.on('connect', () => {
    console.log('[Redis] client connected');
});

//trying to connect
redisClient.on('reconnecting', () => {
    console.log('[Redis] client reconnecting');
});

//connection closed
redisClient.on('end', () => {
    console.log('[Redis] client disconnected');
});

//error
redisClient.on('error', (err) => {
    console.log('[Redis] client error: ', err);
});


export default redisClient;