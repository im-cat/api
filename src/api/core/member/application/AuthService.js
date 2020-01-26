import Moment from 'moment'
import {sign} from '../../../common/jwt'
import {MemberToken} from '../domain/MemberToken'
import crypto from 'crypto'
import {MemberIsDisabledException} from '../domain/member/MemberIsDisabledException'

export default class AuthService {
  constructor ({sequelizeMemberRepository, sequelizeMemberTokenRepository}) {
    this.memberRepository = sequelizeMemberRepository
    this.memberTokenRepository = sequelizeMemberTokenRepository
  }

  async login (loginId) {
    try {
      const member = await this.memberRepository.findMemberByLoginId(loginId)
      const expireAt = Moment(new Date()).add(1, 'year')

      if (member) {
        if (member.disabled === 1) {
          throw new MemberIsDisabledException()
        }

        let newMemberToken = {}
        const memberToken = await this.memberTokenRepository.findMemberToken(member.memberId)

        if (memberToken) {
          newMemberToken = await this.memberTokenRepository.updateMemberTokenExpire(memberToken, expireAt)
        } else {
          newMemberToken = await this._createNewMemberToken(member.memberId, expireAt)
        }

        return newMemberToken.accessToken
      }

      const hash = crypto.createHash('md5').update(loginId).digest('hex')
      const icon = `https://gravatar.com/avatar/${hash}?d=identicon`

      const newMember = await this.memberRepository.createMember(loginId, icon)
      const newMemberToken = await this._createNewMemberToken(newMember.memberId, expireAt)

      return newMemberToken.accessToken
    } catch (error) {
      throw error
    }
  }

  async logout (memberId) {
    try {
      const memberToken = await this.memberTokenRepository.findMemberToken(memberId)
      await this.memberTokenRepository.deleteMemberToken(memberToken)

      return null
    } catch (error) {
      throw error
    }
  }

  async _createNewMemberToken (memberId, expireAt) {
    const newToken = await sign(memberId)

    const memberToken = new MemberToken({
      memberId: memberId,
      accessToken: newToken,
      expireAt
    })
    const newMemberToken = await this.memberTokenRepository.createMemberToken(memberToken)

    return newMemberToken
  }
}
