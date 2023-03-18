const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const {
  userName,
  clientId,
  clientSecret,
  refreshToken,
  redirectUrl,
} = require("../configs/email.config");

module.exports =  async (mailOptions)=> {
  try {
    
    const oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl
    );
   
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: userName,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    // const mailOptions = {
    //   from: "CRM APP🌏 <sayyedaamandev01@gmail.com>",
    //   to: "sayyedaaman9@gmail.com",
    //   subject: "test of gmail api",
    //   text: "Hello I am a email !!!",
    //   html: "<h1>Hello I am a email !!!</h1>",
    // };

    // const mailOptions = {
    //   from: requester,
    //   to:  recepient,
    //   subject: subject,
    //   text: text,
    //   html: html,
    // };
    const result = await transporter.sendMail(mailOptions);
   
    return result;
  } catch (error) {
    console.log('error',error)
    return error;
  }
}
