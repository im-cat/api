import {ArticleCount} from '../../domain/ArticleCount'

export const SequelizeArticleCountMapper = {
  toEntity ({dataValues}) {
    const {
      articleCountId,
      articleId,
      viewCount,
      wishCount,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new ArticleCount({
      articleCountId,
      articleId,
      viewCount,
      wishCount,
      createdAt,
      updatedAt,
      deletedAt,
    })
  },

  toDatabase (dataValues) {
    const {
      articleId,
      viewCount,
      wishCount,
    } = dataValues

    return {
      articleId,
      viewCount,
      wishCount,
    }
  },
}
