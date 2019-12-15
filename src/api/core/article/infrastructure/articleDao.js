import {Article, ArticleCount} from '../models'

export class ArticleDao {

  async createArticle (articleData) {
    const articleInfo = await Article.create(articleData)
    return articleInfo.toJSON()
  }

  createArticleCount (articleCountData) {
    return ArticleCount.create(articleCountData)
  }
}
