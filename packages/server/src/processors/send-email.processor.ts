import * as nodemailer from "nodemailer"
import { emailTransport } from "../config"

export const sendEmailFunctionName = "sendEmail"

export const sendEmail = async (job) => {
    let emailPayload = job.data;

    try {
        let transporter = nodemailer.createTransport(emailTransport);
        await transporter.sendMail(emailPayload);
    }
    catch (error) {
        console.log("Error while sending email: " + error);
    }
}