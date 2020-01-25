import {Article} from '../domain/article/Article'
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

      const article = new Article({memberId, title, mainText, letterNumber, finishCondition})
      const {valid, errors} = article.validate()

      if (!valid) {
        const error = new Error('ValidationError')
        error.details = errors

        throw error
      }

      await this._checkTaboo(title)

      const newArticle = await this.articleRepository.createArticle(article)

      const {articleId} = newArticle

      const articleCountDomain = new ArticleCount({articleId})
      await this.articleCountRepository.createArticleCount(articleCountDomain)

      if (tags.length > 0) {
        await this._checkTaboo(tags)
        const generatedTags = await this.tagService.createTag(tags, articleId)
        return {...newArticle.attributes, tags: generatedTags}
      }

      return {...newArticle.attributes, tags: []}
    } catch (error) {
      throw error
    }
  }

  async findAllArticle (start, count, type) {
    try {
      const articles = await this.articleRepository.findAndCountAllArticle(start, count, type)

      let result = {}
      result.items = articles.items
      result.total = articles.total
      result.start = start
      result.count = count

      return result
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
