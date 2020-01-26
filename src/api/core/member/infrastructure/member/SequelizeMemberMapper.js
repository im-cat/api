import {Member} from '../../domain/member/Member'

export const SequelizeMemberMapper = {
  toEntity ({dataValues}) {
    const {
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
    } = dataValues

    return new Member({
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
    })
  },

  toDatabase (dataValues) {
    const {nickname, age, gender, icon} = dataValues

    return {nickname, age, gender, icon}
  },
}
