import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID ="562264406107-njusc9u0mt0ib62v70lslap0mnsc7bp7.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN ="1//04egi3Do7VAo1CgYIARAAGAQSNwF-L9Ir54mRvX4igXBxzif-IT-5-AU7I3zVauLh_JB17D3IKJUV6nVJWqWLpDnm4vPVDPzbPls"

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async function sendMail(guardianEmail, carNumber, location) {
  try {
    console.log(guardianEmail,carNumber,location)
    if (!guardianEmail || !carNumber || !location) {
      throw new Error("Missing required parameters");
    }
    console.log('Attempting to retrieve access token...');
    const accessToken = await oAuth2Client.getAccessToken();
  
   
    console.log('Creating transport...');
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

    console.log('Setting up mail options...');

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

    console.log('Sending email...');
    const result = await transport.sendMail(mailOptions);
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    return error;
  }
}

