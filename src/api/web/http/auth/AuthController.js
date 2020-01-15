import {route, POST} from 'awilix-express'
import {success} from '../../response'

@route('/auth')
export default class AuthController {
  constructor ({memberService}) {
    this.memberService = memberService
  }

  @POST()
  login = async (req, res, next) => {
    try {
      const loginId = req.body.id
      const token = await this.memberService.login(loginId)

      return success(res, 200)({token})
    } catch (e) {
      next(e)
    }
  }
}
