export default class SequelizeArticleRepository {
  constructor ({article, articleCount}) {
    this.articleModel = article
    this.articleCountModel = articleCount
  }

  async createArticle (articleData) {
    const articleInfo = await this.articleModel.create(articleData)
    return articleInfo.toJSON()
  }

  createArticleCount (articleCountData) {
    return this.articleCountModel.create(articleCountData)
  }
}
