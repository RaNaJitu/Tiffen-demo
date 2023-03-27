
const login = require('./login')
const category = require('./categories')
const menuList = require('./menuList')
const signup = require('./signup')
/**
* BUG NAME: need to remove all MBX CRM sync up API calls & remove two way sync apis
* BUG ID: --
* DEVELOPER NAME: Karan Sojitra
* FIX DATE: 23 Apr, 2021
* FIX DESCRIPTION: commented API call functions & API routes exports
*/

const allRoutes = [].concat(
  login,
  category,
  signup,  
  // menuList

)
// console.log('=======allRoutes========', allRoutes)
const register = (server) => {
  server.route(allRoutes)
}

exports.plugin = {
  name: 'base-routes',
  version: '1.0.0',
  register
}
