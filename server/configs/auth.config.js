if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
module.exports = {
    secret : process.env.SECRET_KEY
}