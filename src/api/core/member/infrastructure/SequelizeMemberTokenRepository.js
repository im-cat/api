import {SequelizeMemberTokenMapper as MemberTokenMapper} from './SequelizeMemberTokenMapper'

export default class SequelizeMemberTokenRepository {
  constructor ({memberToken}) {
    this.memberTokenModel = memberToken
  }

  async updateMemberTokenExpire (memberToken, expireAt) {
    const transaction = await this.memberTokenModel.sequelize.transaction()

    try {
      const updatedMemberToken = await memberToken.update({expireAt}, {transaction})
      const memberTokenEntity = MemberTokenMapper.toEntity(updatedMemberToken)

      const {valid, errors} = memberTokenEntity.validate()

      if (!valid) {
        const error = new Error('ValidationError')
        error.details = errors

        throw error
      }

      await transaction.commit()

      return memberTokenEntity
    } catch (error) {
      await transaction.rollback()

      throw error
    }
  }

  async createMemberToken (memberToken) {
    const {valid, errors} = memberToken.validate()

    if (!valid) {
      const error = new Error('ValidationError')
      error.details = errors

      throw error
    }

    const newMemberToken = await this.memberTokenModel.create(MemberTokenMapper.toDatabase(memberToken))

    return MemberTokenMapper.toEntity(newMemberToken)
  }

  async findMemberToken (memberId) {
    try {
      return this.memberTokenModel.findOne({where: {memberId}})
    } catch (error) {
      throw error
    }
  }
}
