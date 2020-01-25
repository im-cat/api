import {SequelizeArticleCountMapper as articleCountMapper} from './SequelizeArticleCountMapper'

export default class SequelizeArticleCountRepository {
  constructor ({articleCount}) {
    this.articleCountModel = articleCount
  }

  async createArticleCount (articleCount) {

    const {valid, errors} = articleCount.validate()

    if (!valid) {
      const error = new Error('ValidationError')
      error.details = errors

      throw error
    }

    const newArticleCount = await this.articleCountModel.create(articleCountMapper.toDatabase(articleCount))
    return articleCountMapper.toEntity(newArticleCount)
  }

  incrementViewCount (articleId) {
    return this.articleCountModel.increment('viewCount', {where: {articleId}})
  }

  findArticleCount (articleId, options = {}) {
    return this.articleCountModel.findOne({attributes: ['viewCount', 'wishCount'], where: {articleId}, ...options})
  }
}
