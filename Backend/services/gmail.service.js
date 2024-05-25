import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID =
  "562264406107-njusc9u0mt0ib62v70lslap0mnsc7bp7.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04VoXDNWpvl7KCgYIARAAGAQSNwF-L9IrKPtlDhS0r1at1Hon3YJdSPKQvFJ8w0HH7AhpwPL3ROWe7SDizNxrc3tkGZSUmnTJprA";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async function sendMail(guardianEmail, carNumber, location) {
  try {
    if (!guardianEmail || !carNumber || !location) {
      throw new Error("Missing required parameters");
    }
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "karanbishta104@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Ambu Care <karanbishta104@gmail.com>",
      to: guardianEmail,
      subject: "Accident Report from AMbuCare",
      text:
        "Accident occur for Car Number " +
        carNumber +
        "having location " +
        location,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));
