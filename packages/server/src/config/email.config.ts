import { HandlebarsAdapter } from "@nest-modules/mailer";

const transport =
    process.env.EMAIL_CONNECTION_URL ||
    "smtps://unfrltempcarpool@gmail.com:testpass117@smtp.gmail.com"; //More info on connection urls here: https://nodemailer.com/smtp/ and https://nodemailer.com/usage/using-gmail/
export const emailConfig: any = {
    transport,
    defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
            strict: true,
        },
    },
};
