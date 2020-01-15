export default class SequelizeMemberRepository {
  constructor ({member}) {
    this.memberModel = member
  }

  findByLoginId (loginId, options) {
    return this.memberModel.findOne({where: {loginId}, ...options})
  }

  createMember (loginId) {
    return this.memberModel.create({loginId, loginService: 'apple'})
  }
}
