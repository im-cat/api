import {Article} from '../../domain/article/Article'

export const SequelizeArticleMapper = {
  toEntity ({dataValues}) {
    const {
      articleId,
      memberId,
      title,
      mainText,
      image,
      letterNumber,
      finishCondition,
      isFinish,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new Article({
      articleId,
      memberId,
      title,
      mainText,
      image,
      letterNumber,
      finishCondition,
      isFinish,
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
