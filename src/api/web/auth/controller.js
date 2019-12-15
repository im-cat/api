import {sign} from '../../common/jwt'
import {success} from '../../common/response/index'
import {Member, MemberToken} from '../../core/member/models'
import Moment from 'moment'

export const login = async (req, res, next) => {
  try {
    const loginId = req.body.id
    const memberInfo = await Member.findOne({where: {loginId}, raw: true})

    const expireAt = Moment(new Date()).add(1, 'year')
    let token

    if (memberInfo) {
      const memberId = memberInfo.memberId
      const member = await MemberToken.findOne({where: {memberId}, raw: true})
      token = member.accessToken

      await MemberToken.update({expireAt}, {where: {memberId, accessToken: token}})

    } else {
      const member = await Member.create({loginId, loginService: 'apple'})
      const memberId = member.memberId
      token = await sign(memberId)

      await MemberToken.create({memberId, accessToken: token, expireAt})
    }
    return success(res, 201)({token})
  } catch (e) {
    next(e)
  }
}
