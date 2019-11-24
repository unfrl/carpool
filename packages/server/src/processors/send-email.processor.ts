import * as nodemailer from "nodemailer"
import { emailConfig } from "../config"

export const sendEmailFunctionName = "sendEmail"

export const sendEmail = async (job) => {
    let emailPayload = job.data;

    try {
        let transporter = nodemailer.createTransport(emailConfig);

        await transporter.sendMail(emailPayload);
    }
    catch (error) {
        console.log("Error while sending email: " + error);
    }
}