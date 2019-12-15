import {Member} from '../models'

export class MemberDao {

  findByLoginId (loginId, options) {
    return Member.findOne({where: {loginId}, ...options})
  }

  createMember (loginId) {
    return Member.create({loginId, loginService: 'apple'})
  }
}
