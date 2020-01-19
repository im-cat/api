import {Taboo} from '../../domain/taboo/Taboo'

export const SequelizeMemberMapper = {
  toEntity ({dataValues}) {
    const {
      tabooId,
      text,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new Taboo({
      tabooId,
      text,
      createdAt,
      updatedAt,
      deletedAt,
    })
  },
}
