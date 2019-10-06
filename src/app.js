import http from 'http'
import {env, port, ip, apiRoot, syncForce, syncModels} from './config'
import express from './services/express'
import {sequelize} from './services/sequelize'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

function startServer () {
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
}

sequelize
  .authenticate()
  .then(() => (syncModels ? sequelize.sync({force: syncForce}) : Promise.resolve()))
  .then(startServer)
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Server failed to start due to error: %s', err)
  })

export default app
