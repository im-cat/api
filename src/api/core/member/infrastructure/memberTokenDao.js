import {MemberToken} from '../models'

export class MemberTokenDao {

  findByMemberId (memberId, options) {
    return MemberToken.findOne({where: {memberId}, ...options})
  }

  updateExpireAt (expireAt, memberId, token) {
    return MemberToken.update({expireAt}, {where: {memberId, accessToken: token}})
  }

  createMemberToken(memberId, token, expireAt) {
    return MemberToken.create({memberId, accessToken: token, expireAt})
  }
}
