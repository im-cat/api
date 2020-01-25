import {SequelizeArticleMapper as articleMapper} from './SequelizeArticleMapper'
import {VIEW_TYPE} from '../../../../common/viewType'
import {upperCase} from 'lodash'
import messages from '../../../../common/messages/message'

export default class SequelizeArticleRepository {
  constructor ({article, articleCount}) {
    this.articleModel = article
    this.articleCountModel = articleCount
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
      const article = await this.articleModel.findByPk(id, {rejectOnEmpty: true})

      return articleMapper.toEntity(article)
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
