
const sendOTP = require('./sendOTP')
const verifyOTP = require('./verifyOTP')
const routes = require('./routes')

module.exports = [].concat(
    sendOTP,
    verifyOTP,
    routes
)
