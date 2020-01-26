import {MemberNicknameLengthException} from '../domain/member/MemberNicknameLengthException'
import {MemberNicknameDuplicateException} from '../domain/member/MemberNicknameDuplicateException'

export default class MemberService {
  constructor ({sequelizeMemberRepository}) {
    this.memberRepository = sequelizeMemberRepository
  }

  async updateMember (memberId, memberReqData) {
    try {
      const {nickname} = memberReqData

      if (nickname) {
        await this._nickNameLengthCheck(nickname)
        await this._nickNameDuplicateCheck(nickname, memberId)
      }

      const updatedMember = await this.memberRepository.updateMember(memberId, memberReqData)

      return updatedMember
    } catch (error) {
      throw error
    }
  }

  async findMember (memberId) {
    try {
      return this.memberRepository.findMember(memberId)
    } catch (error) {
      throw error
    }
  }

  followMember (followerId, followingId) {
    try {
      return this.memberRepository.createFollow(followerId, followingId)
    } catch (error) {
      throw error
    }
  }

  unFollowMember (followerId, followingId) {
    try {
      return this.memberRepository.deleteFollow(followerId, followingId)
    } catch (error) {
      throw error
    }
  }

  _nickNameLengthCheck (nickname) {
    if (nickname.length > 10) {
      throw new MemberNicknameLengthException()
    }
  }

  async _nickNameDuplicateCheck (nickname, memberId) {
    const existNickname = await this.memberRepository.findMemberByNickname(nickname)

    if (existNickname && existNickname.memberId !== memberId) {
      throw new MemberNicknameDuplicateException()
    }
  }
}
