import {convertDatetime} from '../../../common/utils/convertDatetime'

export const MemberSerializer = {
  serialize ({
    memberId,
    loginId,
    nickname,
    loginService,
    age,
    gender,
    icon,
    role,
    disabled,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    createdAt = convertDatetime(createdAt)
    updatedAt = convertDatetime(updatedAt)
    deletedAt = convertDatetime(deletedAt)

    return {
      memberId,
      loginId,
      nickname,
      loginService,
      age,
      gender,
      icon,
      role,
      disabled,
      createdAt,
      updatedAt,
      deletedAt,
    }
  }
}
