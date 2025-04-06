const redis = require("redis");

const redisClient = redis.createClient({
    url: `rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    pingInterval: 10000,
});

redisClient.on("error", function (err) {
    console.error("Redis error:", err);
    redisClient.connect();
});

(async () => {
    try {
        await redisClient.connect();
        console.log("✅ Redis connected");
    } catch (err) {
        console.error("Redis error:", err);
    }
})();

module.exports = redisClient;
