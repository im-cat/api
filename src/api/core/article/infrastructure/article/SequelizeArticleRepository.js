import {SequelizeArticleMapper as articleMapper} from './SequelizeArticleMapper'

export default class SequelizeArticleRepository {
  constructor ({article}) {
    this.articleModel = article
  }

  async createArticle (article) {

    const {valid, errors} = article.validate()

    if (!valid) {
      const error = new Error('ValidationError')
      error.details = errors

      throw error
    }

    const newArticle = await this.articleModel.create(articleMapper.toDatabase(article))
    return articleMapper.toEntity(newArticle)
  }
}
