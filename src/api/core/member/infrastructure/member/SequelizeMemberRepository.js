import {SequelizeMemberMapper as MemberMapper} from './SequelizeMemberMapper'

export default class SequelizeMemberRepository {
  constructor ({member, follow}) {
    this.memberModel = member
    this.followModel = follow
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

  async findMember (memberId) {
    try {
      const member = await this._getMemberByMemberId(memberId)

      return MemberMapper.toEntity(member)
    } catch (error) {
      throw error
    }
  }

  async findAllMember (memberIds) {
    try {
      const members = await this.memberModel.findAll({
        where: {memberId: memberIds}
      })

      return members.map(MemberMapper.toEntity)
    } catch (error) {
      throw error
    }
  }

  async updateMember (memberId, memberReqData) {
    const transaction = await this.memberModel.sequelize.transaction()

    try {
      const member = await this._getMemberByMemberId(memberId)
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

  createFollow (followerId, followingId) {
    try {
      return this.followModel.create({followerId, followingId})
    } catch (error) {
      throw error
    }
  }

  async deleteFollow (followerId, followingId) {
    try {
      const follow = await this.followModel.findOne({where: {followerId, followingId}})
      if (follow) {
        await follow.destroy()
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findFollowerIds (memberId, start, count) {
    try {
      const {count: total, rows} = await this.followModel.findAndCountAll({
        attributes: ['followerId'],
        where: {followingId: memberId},
        offset: start,
        limit: count
      })

      return {
        items: rows.map(row => row.followerId),
        total
      }
    } catch (error) {
      throw error
    }
  }

  async _getMemberByMemberId (memberId) {
    return this.memberModel.findOne({where: {memberId}})
  }

}
