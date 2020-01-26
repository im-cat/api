import {MemberNicknameLengthException} from '../domain/member/MemberNicknameLengthException'
import {MemberNicknameDuplicateException} from '../domain/member/MemberNicknameDuplicateException'
import {MemberCannotFollowException} from '../domain/member/MemberCannotFollowException'
import {MemberAlreadyFollowException} from '../domain/member/MemberAlreadyFollowException'
import {MemberCannotUnFollowException} from '../domain/member/MemberCannotUnFollowException'

export default class MemberService {
  constructor ({sequelizeMemberRepository, sequelizeArticleRepository}) {
    this.memberRepository = sequelizeMemberRepository
    this.articleRepository = sequelizeArticleRepository
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

  async followMember (followerId, followingId) {
    try {
      const member = await this.memberRepository.findMemberByMemberId(followingId)

      if (Number(followerId) === Number(followingId) || !member) {
        throw new MemberCannotFollowException()
      }

      const existFollow = await this.memberRepository.findFollow(followerId, followingId)

      if (existFollow) {
        throw new MemberAlreadyFollowException()
      }
      return this.memberRepository.createFollow(followerId, followingId)
    } catch (error) {
      throw error
    }
  }

  async unFollowMember (followerId, followingId) {
    try {
      const member = await this.memberRepository.findMemberByMemberId(followingId)

      if (Number(followerId) === Number(followingId) || !member) {
        throw new MemberCannotUnFollowException()
      }

      const existFollow = await this.memberRepository.findFollow(followerId, followingId)

      if (!existFollow) {
        throw new MemberCannotUnFollowException()
      }

      return this.memberRepository.deleteFollow(existFollow)
    } catch (error) {
      throw error
    }
  }

  async findMyWishArticle (memberId, start, count) {
    try {
      const wishArticleIds = await this.articleRepository.findAllMemberWishArticleIds(memberId, start, count)
      const articles = await this.articleRepository.findAndCountAllArticle(start, count, null, null, wishArticleIds.items)

      const result = {
        items: articles.items,
        total: wishArticleIds.total,
        start,
        count
      }

      return result
    } catch (error) {
      throw error
    }
  }

  async findFollowList (memberId, start, count, type) {
    try {
      const followIds = await this.memberRepository.findFollowIds(memberId, start, count, type)
      const follows = await this.memberRepository.findAllMember(followIds.items)

      return {total: followIds.total, items: follows, start, count}
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
