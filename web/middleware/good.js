
const options = {
  ops: false,
  reporters: {
    myConsoleReporter: [
      {
        module: '@hapi/good-console',
        args: [{
          format: 'YYYYMMDD/HHmmss.SSS'
        }]
      },
      'stdout'
    ]
  }
}

module.exports = {
  plugin: require('@hapi/good'),
  options
}
