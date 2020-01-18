import {Member} from '../domain/Member'

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
    const {loginId, nickname, loginService, age, gender, icon, role} = dataValues

    return {loginId, nickname, loginService, age, gender, icon, role}
  },
}
