import {Article} from '../../domain/Article'

export const SequelizeArticleMapper = {
  toEntity ({dataValues}) {
    const {
      articleId,
      memberId,
      title,
      mainText,
      letterNumber,
      finishCondition,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new Article({
      articleId,
      memberId,
      title,
      mainText,
      letterNumber,
      finishCondition,
      createdAt,
      updatedAt,
      deletedAt,
    })
  },

  toDatabase (dataValues) {
    const {
      memberId,
      title,
      mainText,
      letterNumber,
      finishCondition
    } = dataValues

    return {
      memberId,
      title,
      mainText,
      letterNumber,
      finishCondition
    }
  },
}
