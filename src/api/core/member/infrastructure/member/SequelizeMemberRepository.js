import {SequelizeMemberMapper as MemberMapper} from './SequelizeMemberMapper'

export default class SequelizeMemberRepository {
  constructor ({member}) {
    this.memberModel = member
  }

  findMemberByMemberId (memberId) {
    try {
      return this.memberModel.findOne({where: {memberId}, raw: true})
    } catch (error) {
      throw error
    }
  }

  findMemberByLoginId (loginId) {
    try {
      return this.memberModel.findOne({where: {loginId}, raw: true})
    } catch (error) {
      throw error
    }
  }

  findMemberByNickname (nickname) {
    try {
      return this.memberModel.findOne({where: {nickname}, raw: true})
    } catch (error) {
      throw error
    }
  }

  async createMember (loginId, icon) {
    try {
      const newMember = await this.memberModel.create({
        loginId, icon
        , loginService: 'apple'
      })

      return MemberMapper.toEntity(newMember)
    } catch (error) {
      throw error
    }
  }

  async updateMember (memberId, memberReqData) {
    const transaction = await this.memberModel.sequelize.transaction()

    try {
      const member = await this.memberModel.findOne({where: {memberId}})
      const updatedMember = await member.update(MemberMapper.toDatabase(memberReqData), {transaction})
      const memberEntity = MemberMapper.toEntity(updatedMember)

      const {valid, errors} = memberEntity.validate()

      if (!valid) {
        const error = new Error('ValidationError')
        error.details = errors

        throw error
      }

      await transaction.commit()

      return memberEntity
    } catch (error) {
      await transaction.rollback()

      throw error
    }

  }
}
