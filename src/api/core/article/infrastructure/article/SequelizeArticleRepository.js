import {SequelizeArticleMapper as articleMapper} from './SequelizeArticleMapper'
import {VIEW_TYPE} from '../../../../common/viewType'
import {upperCase} from 'lodash'
import messages from '../../../../common/messages/message'

export default class SequelizeArticleRepository {
  constructor ({article, articleCount, memberWishArticle}) {
    this.articleModel = article
    this.articleCountModel = articleCount
    this.memberWishArticleModel = memberWishArticle
  }

  getTransaction () {
    return this.articleModel.sequelize.transaction()
  }

  updateArticleIsFinish (articleId) {
    try {
      return this.articleModel.update({isFinish: 1}, {where: {articleId}})
    } catch (error) {
      throw error
    }
  }

  async createArticle (article) {
    const newArticle = await this.articleModel.create(articleMapper.toDatabase(article))
    return articleMapper.toEntity(newArticle)
  }

  async findAndCountAllArticle (start, count, type) {
    try {

      const condition = this._createConditionByType(start, count, type)

      const {count: total, rows} = await this.articleCountModel.findAndCountAll({...condition})

      return {
        items: rows.map(row => {
          row = row.toJSON()
          return {viewCount: row.viewCount, wishCount: row.wishCount, ...row.article}
        }),
        total
      }
    } catch
      (error) {
      throw error
    }
  }

  async findArticleById (id) {
    try {
      const article = await this._getArticleById(id)

      return articleMapper.toEntity(article)
    } catch (error) {
      throw error
    }
  }

  async deleteArticle (articleId, options = {}) {
    try {
      const article = await this._getArticleById(articleId)
      await article.destroy({...options})

      return null
    } catch (error) {
      throw error
    }
  }

  async deleteMemberWishArticle (articleId, options = {}) {
    try {
      const memberWishArticles = await this.memberWishArticleModel.findAll({where: {articleId}})
      if (memberWishArticles.length > 0) {
        await memberWishArticles.map(memberWishArticle => memberWishArticle.destroy({...options}))
      }
    } catch (error) {
      throw error
    }
  }

  findMemberWishArticle (memberId, articleId) {
    try {
      return this.memberWishArticleModel.findOne({where: {memberId, articleId}})
    } catch (error) {
      throw error
    }
  }

  wishArticle (memberId, articleId) {
    try {
      return this.memberWishArticleModel.create({memberId, articleId})
    } catch (error) {
      throw error
    }
  }

  async unWishArticle (memberWishArticle) {
    try {
      await memberWishArticle.destroy()
      return null
    } catch (error) {
      throw error
    }
  }

  async _getArticleById (id) {
    try {
      return await this.articleModel.findByPk(id, {rejectOnEmpty: true})
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError')
        notFoundError.code = messages.E003.code
        notFoundError.details = messages.E003.detail

        throw notFoundError
      }

      throw error
    }
  }

  _createConditionByType (start, count, type) {
    let order = {}
    if (upperCase(type) === VIEW_TYPE.FINISH) {
      order = {order: [[this.articleModel, 'updatedAt', 'DESC']]}
    }

    if (upperCase(type) === VIEW_TYPE.VIEW) {
      order = {order: [['viewCount', 'DESC']]}
    }

    if (upperCase(type) === VIEW_TYPE.WISH) {
      order = {order: [['wishCount', 'DESC']]}
    }

    return {
      attributes: ['viewCount', 'wishCount'],
      include: [{
        attributes: {exclude: ['letterNumber', 'finishCondition']},
        model: this.articleModel,
      }],
      ...order,
      offset: start,
      limit: count,
    }
  }
}
