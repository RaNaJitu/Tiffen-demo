const register = async server => {
  // adding auth strategies
  // server.auth.strategy('guest', 'pass')
  // server.auth.strategy('user', 'pass')
  server.auth.strategy('superAdmin', 'pass')
  server.auth.strategy('admin', 'pass')
  // server.auth.strategy('basic', 'pass')
}

exports.plugin = {
  name: 'authScheme',
  version: '1.0.0',
  register
}
