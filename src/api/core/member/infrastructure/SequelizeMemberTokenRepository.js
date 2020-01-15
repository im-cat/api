export default class SequelizeMemberTokenRepository {
  constructor ({memberToken}) {
    this.memberTokenModel = memberToken
  }

  findByMemberId (memberId, options) {
    return this.memberTokenModel.findOne({where: {memberId}, ...options})
  }

  updateExpireAt (expireAt, memberId, token) {
    return this.memberTokenModel.update({expireAt}, {where: {memberId, accessToken: token}})
  }

  createMemberToken(memberId, token, expireAt) {
    return this.memberTokenModel.create({memberId, accessToken: token, expireAt})
  }
}
