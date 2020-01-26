import {Tag} from '../../domain/tag/Tag'

export const SequelizeTagMapper = {
  toEntity ({dataValues}) {
    const {
      tagId,
      text,
      taggedCount,
      createdAt
    } = dataValues

    return new Tag({
      tagId,
      text,
      taggedCount,
      createdAt
    })
  },
}
