import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import jsend from 'jsend'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../common/config'
import { loadControllers, scopePerRequest } from 'awilix-express'
import { Lifetime } from 'awilix'
import container from '../../container'

export default apiRoot => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(jsend.middleware)
  app.use(scopePerRequest(container))
  app.use(
    apiRoot,
    loadControllers('../../web/http/**/*Controller.js', {
      cwd: __dirname,
      lifetime: Lifetime.SINGLETON,
    }),
  )
  app.get('/health-check', (req, res) => res.status(200).json({ healthy: true }))
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
