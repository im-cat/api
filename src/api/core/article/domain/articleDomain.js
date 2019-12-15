import {ArticleCreationException} from './articleCreationException'

export class ArticleDomain {
  constructor (dao) {
    this.dao = dao
  }

  createArticle (articleData) {
    const {
      title,
      mainText,
      letterNumber,
      finishCondition
    } = articleData

    if (!title || !mainText || !letterNumber || !finishCondition) {
      throw new ArticleCreationException()
    }

    return this.dao.createArticle(articleData)
  }
}
