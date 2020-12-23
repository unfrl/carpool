import { HandlebarsAdapter, MailerOptions } from "@nest-modules/mailer";

const emailHost = process.env.EMAIL_HOST || "localhost";
const emailPort = process.env.EMAIL_PORT || 1025;
const emailAuthUser = process.env.EMAIL_AUTH_USER || "unfrl@fakeemail.com";
const emailPassword = process.env.EMAIL_AUTH_PASSWORD || "";
const emailTLS = process.env.EMAIL_IGNORE_TLS || true;
const emailSecure = process.env.EMAIL_SECURE || false;

export const emailTransport: any = {
    host: emailHost,
    port: emailPort,
    ignoreTLS: emailTLS,
    secure: emailSecure,
    auth: {
        user: emailAuthUser,
        pass: emailPassword
    },
};

export const mailModuleConfig: MailerOptions = {
    transport: emailTransport,
    defaults: {
        from: "Unfrl LLC <noreply@carpool+unfrl.com>",
    },
    template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
            strict: true,
        },
    },
};
