import http from 'http'
import {env, port, ip, apiRoot, syncForce, syncModels} from 'api/config'
import express from 'api/config/express'
import {sequelize} from 'api/config/sequelize'
import api from './api/web/router'

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
