import {Article} from '../domain/article/Article'
import {ArticleCount} from '../domain/ArticleCount'
import {TabooException} from '../domain/taboo/TabooException'

export default class ArticleService {
  constructor ({sequelizeArticleRepository, sequelizeTabooRepository, sequelizeTagRepository, sequelizeArticleCountRepository, sequelizeContentRepository, tagService}) {
    this.articleRepository = sequelizeArticleRepository
    this.tabooRepository = sequelizeTabooRepository
    this.articleCountRepository = sequelizeArticleCountRepository
    this.tagRepository = sequelizeTagRepository
    this.contentRepository = sequelizeContentRepository
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

  async findAllArticle (start, count, type, memberId) {
    try {
      const articles = await this.articleRepository.findAndCountAllArticle(start, count, type, memberId)

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

  async findByArticleId (articleId) {
    try {
      const article = await this.articleRepository.findArticleById(articleId)

      await this.articleCountRepository.incrementViewCount(articleId)
      const articleCount = await this.articleCountRepository.findArticleCount(articleId, {useMaster: true, raw: true})

      const articleTags = await this.tagService.findArticleTags(articleId)

      const result = {
        ...article.attributes,
        ...articleCount,
        tags: articleTags
      }

      return result
    } catch (error) {
      throw error
    }
  }

  async deleteAllInfoAboutArticles (articleId) {
    const transaction = await this.articleRepository.getTransaction()

    try {
      await this.articleRepository.deleteArticle(articleId, {transaction})
      await this.tagRepository.deleteArticleTag(articleId, {transaction})
      await this.contentRepository.deleteContentByArticleId(articleId, {transaction})
      await this.articleRepository.deleteMemberWishArticle(articleId, {transaction})
      await this.articleCountRepository.deleteArticleCount(articleId, {transaction})

      await transaction.commit()

      return null
    } catch (error) {
      await transaction.rollback()

      throw error
    }
  }

  async wishOrUnWishArticle (memberId, articleId) {
    try {
      const memberWishArticle = await this.articleRepository.findMemberWishArticle(memberId, articleId)

      if (memberWishArticle) {
        await this.articleRepository.unWishArticle(memberWishArticle)
        return {deleted: true}
      }

      await this.articleRepository.wishArticle(memberId, articleId)
      return {created: true}
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
