import {attributes} from 'structure'

export const Member = attributes({
  memberId: {type: Number},
  loginId: {type: String, required: true},
  nickname: {type: String},
  loginService: {type: String, required: true},
  age: {type: Number},
  gender: {type: Number},
  icon: {type: String},
  role: {type: String},
  disabled: {type: Number},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
})(class Member {
})
