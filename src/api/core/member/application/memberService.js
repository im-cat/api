import {MemberTokenDomain} from '../domain/MemberTokenDomain'

import {MemberDao} from '../infrastructure/memberDao'
import {MemberTokenDao} from '../infrastructure/memberTokenDao'

import Moment from 'moment'

export class MemberService {
  async login (loginId) {
    const memberDao = new MemberDao()
    const memberInfo = await memberDao.findByLoginId(loginId, {raw: true})

    const memberTokenDomain = new MemberTokenDomain(new MemberTokenDao())
    const expireAt = Moment(new Date()).add(1, 'year')

    let token

    if (memberInfo) {
      token = await memberTokenDomain.updateMemberTokenExpire(memberInfo.memberId, expireAt)
    } else {
      const member = await memberDao.createMember(loginId)
      token = await memberTokenDomain.createMemberToken(member.memberId, expireAt)
    }

    return token
  }
}
