import {route, GET, before} from 'awilix-express'
import {success} from '../../response'
import {token} from '../../../common/passport'

@route('/members')
export default class MemberController {

  @route('/:memberId')
  @before(token({required: true}))
  @GET()
  findByMemberId = async (req, res, next) => {
    try {
      return success(res, 200)({memberId: 1})
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}
