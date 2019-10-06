/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'test',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    syncModels: process.env.SYNC_MODELS || false,
    syncForce: process.env.SYNC_FORCE || false,
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    db: {
      options: {
        dialect: 'mysql',
        timezone: 'Asia/Seoul',
        logging: false,
        benchmark: false,
        retry: {
          match: [/SequelizeConnectionError/],
          max: 2,
        },
      },
    },
  },
  test: {
    syncModels: true,
    syncForce: true,
    db: {
      uri: requireProcessEnv('DB_URI'),
      options: {
        logging: console.log
      }
    },
  },
  development: {
    db: {
      uri: requireProcessEnv('DB_URI'),
      options: {
        logging: console.log
      }
    },
  },
  production: {
    db: {
      uri: requireProcessEnv('DB_URI'),
    },
  },
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
