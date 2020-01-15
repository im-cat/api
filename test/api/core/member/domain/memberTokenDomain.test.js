import {MemberToken} from '../../../../../src/api/core/member/domain/MemberToken'
import Moment from 'moment'

test('멤버 토큰을 생성할 수 있다.', async () => {
  // given
  const memberId = 2
  const memberTokenDomain = new MemberToken(new FakeMemberTokenDao())
  const expireAt = Moment(new Date()).add(1, 'year')

  // when
  const actual = await memberTokenDomain.createMemberToken(memberId, expireAt)

  // then
  expect(actual).not.toBeNull()
  expect(actual).not.toBeUndefined()
})

test('멤버 토큰의 마감 기한을 수정할 수 있다.', async () => {
  // given
  const memberId = 1
  const fakeMemberTokenDao = new FakeMemberTokenDao()
  const memberTokenDomain = new MemberToken(fakeMemberTokenDao)
  const expireAt = Moment(new Date()).add(1, 'year')

  // when
  const actual = await memberTokenDomain.updateMemberTokenExpire(memberId, expireAt)

  // then
  expect(actual).not.toBeNull()
  expect(actual).not.toBeUndefined()
  expect(fakeMemberTokenDao.findByMemberId(memberId).expireAt).toBe(expireAt)
})

class FakeMemberTokenDao {
  constructor () {
    this.memberTokenMap = new Map().set(1, {
      memberId: 1,
      accessToken: 'abcdefghij',
      expireAt: '2020-12-15 20:20:20'
    })
  }

  findByMemberId (memberId) {
    return this.memberTokenMap.get(memberId)
  }

  updateExpireAt (expireAt, memberId) {
    const memberTokenData = this.memberTokenMap.get(memberId)
    this.memberTokenMap.set(memberId, Object.assign(memberTokenData, {expireAt}))
  }

  createMemberToken (memberId, token, expireAt) {
    this.memberTokenMap.set(memberId, {memberId, accessToken: token, expireAt})
    return this.memberTokenMap.get(memberId)
  }
}
