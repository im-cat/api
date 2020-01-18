import {MemberToken} from '../domain/MemberToken'

export const SequelizeMemberTokenMapper = {
  toEntity ({dataValues}) {
    const {
      memberTokenId,
      memberId,
      accessToken,
      expireAt,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new MemberToken({
      memberTokenId,
      memberId,
      accessToken,
      expireAt,
      createdAt,
      updatedAt,
      deletedAt,
    })
  },

  toDatabase (dataValues) {
    const {memberId, accessToken, expireAt} = dataValues

    return {memberId, accessToken, expireAt}
  },
}
