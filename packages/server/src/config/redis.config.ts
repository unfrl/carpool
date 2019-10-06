const host = process.env.REDIS_HOST || "localhost";
const port = process.env.REDIS_PORT || 6379;

export const redisConfig: any = {
    host,
    port,
    // keyPrefix: "my_prefix_" //Any value from IORedisOptions can also be set
};
