import {sign} from '../../../common/jwt'

export class MemberToken {
  constructor (dao) {
    this.dao = dao
  }

  async updateMemberTokenExpire (memberId, expireAt) {
    const memberTokenInfo = await this.dao.findByMemberId(memberId, {raw: true})
    const token = memberTokenInfo.accessToken

    await this.dao.updateExpireAt(expireAt, memberId, token)
    return token
  }

  async createMemberToken (memberId, expireAt) {
    const token = await sign(memberId)
    console.log(token)
    await this.dao.createMemberToken(memberId, token, expireAt)
    return token
  }
}
