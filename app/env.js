const envalid = require('envalid')
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test/test.env' })
}

const vars = envalid.cleanEnv(
  process.env,
  {
    WASP_SENSOR_TYPE: envalid.str({ default: 'thingy91' }),
  },
  {
    strict: true,
  }
)

module.exports = vars
