import {SequelizeMemberMapper as MemberMapper} from './SequelizeMemberMapper'

export default class SequelizeMemberRepository {
  constructor ({member}) {
    this.memberModel = member
  }

  findMemberByLoginId (loginId) {
    try {
      return this.memberModel.findOne({where: {loginId}, raw: true})
    } catch (error) {
      throw error
    }
  }

  async createMember (loginId) {
    try {
      const newMember = await this.memberModel.create({loginId, loginService: 'apple'})

      return MemberMapper.toEntity(newMember)
    } catch (error) {
      throw error
    }
  }
}
