export const authConfig = {
    secret: process.env.AUTH_SECRET || "superSecret",
    saltOrRounds: process.env.AUTH_SALT_OR_ROUNDS || 10,
};
