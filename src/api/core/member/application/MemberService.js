import {MemberToken} from '../domain/MemberToken'
import Moment from 'moment'

export default class MemberService {
  constructor ({sequelizeMemberRepository, sequelizeMemberTokenRepository}) {
    this.memberRepository = sequelizeMemberRepository
    this.memberTokenRepository = sequelizeMemberTokenRepository
  }

  async login (loginId) {
    const memberInfo = await this.memberRepository.findByLoginId(loginId, {raw: true})

    console.log(memberInfo)

    const memberTokenDomain = new MemberToken(this.memberTokenRepository)
    const expireAt = Moment(new Date()).add(1, 'year')

    let token

    if (memberInfo) {
      token = await memberTokenDomain.updateMemberTokenExpire(memberInfo.memberId, expireAt)
    } else {
      const member = await this.memberRepository.createMember(loginId)
      token = await memberTokenDomain.createMemberToken(member.memberId, expireAt)
    }

    return token
  }
}
