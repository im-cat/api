import {SequelizeArticleMapper as articleMapper} from './SequelizeArticleMapper'
import {VIEW_TYPE} from '../../../../common/viewType'
import {upperCase} from 'lodash'

export default class SequelizeArticleRepository {
  constructor ({article, articleCount}) {
    this.articleModel = article
    this.articleCountModel = articleCount
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
      return await this.articleModel.findByPk(id, {rejectOnEmpty: true})
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError')
        notFoundError.details = `Article id ${id} can't be found.`

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
