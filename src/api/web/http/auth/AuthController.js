import {route, POST, DELETE, before} from 'awilix-express'
import {success, badRequest, notFound} from '../../response'
import Status from 'http-status'
import {token} from '../../../common/passport'

@route('/auth')
export default class AuthController {
  constructor ({authService}) {
    this.authService = authService
  }

  @POST()
  login = async (req, res, next) => {
    try {
      const {id: loginId} = req.body
      const token = await this.authService.login(loginId)

      return success(res, 200)({token})
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @before(token({required: true}))
  @DELETE()
  logout = async (req, res, next) => {
    try {
      const memberId = req.user
      await this.authService.logout(memberId)

      return res.status(Status.OK).end()
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }
}
