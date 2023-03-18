

require('dotenv').config();

module.exports = {
    userName : process.env.MAIL_USERNAME,
    clientId : process.env.OAUTH_CLIENTID,
    clientSecret : process.env.OAUTH_CLIENT_SECRET,
    redirectUrl : process.env.OAUTH_REDIRECT_URL, 
    refreshToken : process.env.OAUTH_REFRESH_TOKEN,

}