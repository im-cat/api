import http from 'http'
import { apiRoot, env, ip, port, syncForce, syncModels } from './common/config'

import express from './infrastructure/express'

export default class Application {
  constructor({ database }) {
    this.database = database
  }

  async start() {
    this.database
      .authenticate()
      .then(syncModels ? this.database.sync({ force: syncForce }) : Promise.resolve())
      .then(startServer)
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Server failed to start due to error: %s', err)
      })
  }
}

const startServer = () => {
  const app = express(apiRoot)
  const server = http.createServer(app)

  server.on('clientError', (err, socket) => {
    // eslint-disable-next-line no-console
    console.error('Server failed with clinetError: %s', err)
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  })

  setImmediate(() => {
    server.listen(port, ip, () => {
      // eslint-disable-next-line no-console
      console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    })
  })

  return null
}
