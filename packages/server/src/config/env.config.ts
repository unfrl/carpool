const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';
const isProduction = env === 'production';

export const envConfig = {
    env,
    isDevelopment,
    isProduction,
};
