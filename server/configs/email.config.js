

require('dotenv').config();

module.exports = {
    userName : process.env.MAIL_USERNAME,
    password : process.env.MAIL_PASSWORD,
    clientId : process.env.OAUTH_CLIENTID,
    clientSecret : process.env.OAUTH_CLIENT_SECRET,
    refreshToken : process.env.OAUTH_REFRESH_TOKEN
}