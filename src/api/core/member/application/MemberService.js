export default class MemberService {
  constructor ({sequelizeMemberRepository}) {
    this.memberRepository = sequelizeMemberRepository
  }
}
