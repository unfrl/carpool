import { HandlebarsAdapter } from "@nest-modules/mailer";

const emailHost = process.env.EMAIL_HOST || "smtp-relay.sendinblue.com";
const emailUser = process.env.EMAIL_USER || "matt@unfrl.com";
const emailPassword = process.env.EMAIL_PASSWORD || "KgaZA7GVJDcmQbRk";

const transport =
    process.env.EMAIL_CONNECTION_URL || `smtps://${emailUser}:${emailPassword}@${emailHost}`; //More info on connection urls here: https://nodemailer.com/smtp/ and https://nodemailer.com/usage/using-gmail/
export const mailModuleConfig: any = {
    transport,
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

export const emailConfig: any = {
    host: emailHost,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
    defaults: {
        from: "Unfrl LLC <noreply@carpool+unfrl.com>",
    },
};
