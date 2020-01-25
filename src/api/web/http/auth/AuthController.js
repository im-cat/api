import {route, POST} from 'awilix-express'
import {success, badRequest} from '../../response'

@route('/auth')
export default class AuthController {
  constructor ({memberService}) {
    this.memberService = memberService
  }

  @POST()
  login = async (req, res, next) => {
    try {
      const {id: loginId} = req.body
      const token = await this.memberService.login(loginId)

      return success(res, 200)({token})
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {message: error.details})
      }

      next(error)
    }
  }
}
