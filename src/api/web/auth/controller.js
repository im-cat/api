import {sign} from '../../common/jwt'
import {success} from '../../common/response/index'
import {Member} from '../../core/member/models'

export const login = async (req, res, next) => {
  try {
    const loginId = req.body.id
    const memberInfo = await Member.findOne({where: {loginId}})

    if (memberInfo) {
      return sign(memberInfo.memberId)
        .then((token) => ({token}))
        .then(success(res, 201))
        .catch(next)
    }

    const newMember = await Member.create({loginId, loginService: 'apple'})

    return sign(newMember.memberId)
      .then((token) => ({token}))
      .then(success(res, 201))
      .catch(next)
  } catch (e) {
    next(e)
  }
}
