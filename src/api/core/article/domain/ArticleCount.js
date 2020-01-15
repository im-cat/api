export class ArticleCount {
  constructor (dao) {
    this.dao = dao
  }

  createArticleCount (articleId) {
    const articleCountData = {
      articleId,
      viewCount: 0,
      wishCount: 0
    }
    return this.dao.createArticleCount(articleCountData)
  }
}
