import {success} from '../../common/response/index'
import {MemberService} from '../../core/member/application/memberService'

export const login = async (req, res, next) => {
  try {
    const loginId = req.body.id
    const memberService = new MemberService()
    const token = await memberService.login(loginId)

    return success(res, 201)({token})
  } catch (e) {
    next(e)
  }
}
