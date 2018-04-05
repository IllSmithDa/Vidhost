const jwt = require('jwt-simple');
const config = require('./config');

module.exports = (user) => {
   return jwt.encode({
     sub: user.i,
     iat: new Date().getTime(),
   },  config.secret)
}