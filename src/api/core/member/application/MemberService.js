import Moment from 'moment'
import {sign} from '../../../common/jwt'
import {MemberToken} from '../domain/MemberToken'

export default class MemberService {
  constructor ({sequelizeMemberRepository, sequelizeMemberTokenRepository}) {
    this.memberRepository = sequelizeMemberRepository
    this.memberTokenRepository = sequelizeMemberTokenRepository
  }

  async login (loginId) {
    try {
      const member = await this.memberRepository.findMemberByLoginId(loginId)
      const expireAt = Moment(new Date()).add(1, 'year')

      if (member) {
        const memberToken = await this.memberTokenRepository.updateMemberTokenExpire(member.memberId, expireAt)
        return memberToken.accessToken
      }

      const newMember = await this.memberRepository.createMember(loginId)

      const newToken = await sign(newMember.memberId)

      const memberToken = new MemberToken({
        memberId: newMember.memberId,
        accessToken: newToken,
        expireAt
      })
      const newMemberToken = await this.memberTokenRepository.createMemberToken(memberToken)

      return newMemberToken.accessToken
    } catch (error) {
      throw error
    }
  }
}
