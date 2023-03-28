require('dotenv').config({ path: './.env' })

const semver = require('semver')
const config = require('config')

const { infoLogger } = require('./utils/logger')
const pkg = require('./package.json')

// validate Node version requirement
const runtime = {
  expected: semver.validRange(pkg.engines.node),
  actual: semver.valid(process.version)
}

infoLogger.info('[Version-control] Checking node version......')
infoLogger.info(`[Version-control]  Server version .... ${runtime.actual}`)
infoLogger.info(`[Version-control]  Expected version.... ${runtime.expected}`)
const valid = semver.satisfies(runtime.actual, runtime.expected)
if (!valid) {
  throw new Error(
    `Expected Node.js version ${runtime.expected}, but found v${runtime.actual
    }. Please update or change your runtime!`
  )
}
infoLogger.info('[Version-control]  Ok....')
// configure  logger

const type = config.get('AUTH_PROCESS_TYPE')

// log information
infoLogger.info(`Starting ${type} process id:${process.pid}`)

if (type === 'web') {
  require('./web')
} else if (type === 'worker') {
  require('./worker')
} else {
  throw new Error(`${type} is an unsupported process type.`)
}
