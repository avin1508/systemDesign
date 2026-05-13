const express = require('express');
const redis = require('redis');
const app = express();

const port = 3000;


//redis client
const client = redis.createClient({
    socket: {
        host: 'redis',
        port: 6379
    }
})

//redis connection
client.on('error', (error) => {
    console.error('Redis connection error:', error);
})


//function to connect redis
const connectRedis = async () => {
    await client.connect();
    console.log('Connected to Redis');
}

connectRedis(); 

app.get('/', async (req, res) => {

    await client.set('name', 'Avii');

    const data = await client.get('name');

    res.send(`Redis Data: ${data}`);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});