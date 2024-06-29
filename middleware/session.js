require('dotenv').config();

// Redis 연결

const { REDIS_HOST, REDIS_PORT } = process.env;

module.exports = () => {
    var redis = require('ioredis');
    var session = require('express-session');
    var redisStore = require('connect-redis').default;

    const redisClient = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT
    });

    redisClient.on('connect', () => { console.log('Successfully connected to Redis server.'); });
    redisClient.on('error', (err) => { console.log('Redis error', err); });

    return session({
        secret: 'receipt001@!',
        store: new redisStore({
            client: redisClient,
            ttl: 10 * 60 * 1000 // 10분 뒤 세션 만료
        }),
        name: 'api_sid',
        saveUninitialized : false,
        resave: false
    });
}