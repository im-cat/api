import {attributes} from 'structure'

export const MemberToken = attributes({
  memberTokenId: {type: Number},
  memberId: {type: Number, required: true},
  accessToken: {type: String, required: true},
  expireAt: {type: Date, required: true},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
})(class Member {
})
