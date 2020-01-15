import {Article} from '../domain/Article'
import {ArticleCount} from '../domain/ArticleCount'
import {Taboo} from '../domain/Taboo'
import {Tag} from '../domain/Tag'
import {TabooException} from '../domain/TabooException'

export default class ArticleService {
  constructor ({sequelizeArticleRepository, sequelizeTabooRepository, sequelizeTagRepository}) {
    this.articleRepository = sequelizeArticleRepository
    this.tabooRepository = sequelizeTabooRepository
    this.tagRepository = sequelizeTagRepository
  }

  async createNewArticle (memberId, newArticleReqData) {
    const {title, mainText, letterNumber, finishCondition, tags} = newArticleReqData

    await this._checkTaboo(title)
    await this._checkTaboo(tags)

    const articleData = {memberId, title, mainText, letterNumber, finishCondition}

    const articleDomain = new Article(this.articleRepository)
    const articleInfo = await articleDomain.createArticle(articleData)

    const articleId = articleInfo.articleId

    const articleCountDomain = new ArticleCount(this.articleRepository)
    await articleCountDomain.createArticleCount(articleId)

    const tagDomain = new Tag(this.tagRepository)
    await tagDomain.createTag(tags, articleId)

    return articleInfo
  }

  _checkTaboo = async (text) => {
    const tabooDomain = new Taboo(this.tabooRepository)
    const isExistTaboo = await tabooDomain.isExistTaboo(text)

    if (isExistTaboo) {
      throw new TabooException()
    }
  }
}
