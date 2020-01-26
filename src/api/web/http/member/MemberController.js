import {route, before, PATCH} from 'awilix-express'
import {badRequest, success} from '../../response'
import {token} from '../../../common/passport'
import Status from 'http-status'
import {MemberSerializer} from './MemberSerializer'

@before(token({required: true}))
@route('/members')
export default class ContentController {
  constructor ({memberService}) {
    this.memberService = memberService
  }

  @PATCH()
  updateMember = async (req, res, next) => {
    try {
      const memberId = req.user
      const result = await this.memberService.updateMember(memberId, req.body)

      return success(res, Status.OK)(MemberSerializer.serialize(result))
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }
}
