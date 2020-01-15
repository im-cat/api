import {ArticleCreationException} from './ArticleCreationException'

export class Article {
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
