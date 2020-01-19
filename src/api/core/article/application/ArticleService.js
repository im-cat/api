import {Article} from '../domain/Article'
import {ArticleCount} from '../domain/ArticleCount'
import {TabooException} from '../domain/taboo/TabooException'

export default class ArticleService {
  constructor ({sequelizeArticleRepository, sequelizeTabooRepository, sequelizeArticleCountRepository, tagService}) {
    this.articleRepository = sequelizeArticleRepository
    this.tabooRepository = sequelizeTabooRepository
    this.articleCountRepository = sequelizeArticleCountRepository
    this.tagService = tagService
  }

  async createNewArticle (memberId, newArticleReqData) {
    try {
      const {title, mainText, letterNumber, finishCondition, tags} = newArticleReqData

      await this._checkTaboo(title)
      await this._checkTaboo(tags)

      const article = new Article({memberId, title, mainText, letterNumber, finishCondition})
      const newArticle = await this.articleRepository.createArticle(article)

      const {articleId} = newArticle

      const articleCountDomain = new ArticleCount({articleId})
      await this.articleCountRepository.createArticleCount(articleCountDomain)

      const generatedTags = await this.tagService.createTag(tags, articleId)

      return {...newArticle.attributes, tags: generatedTags}
    } catch (error) {
      throw error
    }
  }

  _checkTaboo = async (text) => {
    try {
      let splitText = text

      if (typeof text === 'string') {
        splitText = text.split(' ')
      }

      for (const text of splitText) {
        const taboo = await this.tabooRepository.findByText(text)
        if (taboo) {
          throw new TabooException()
        }
      }
    } catch (error) {
      throw error
    }
  }
}
