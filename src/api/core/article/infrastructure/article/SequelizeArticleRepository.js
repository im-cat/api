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

      const order = this._createConditionByType(type)

      const {count: total, rows} = await this.articleCountModel.findAndCountAll({
        attributes: ['viewCount', 'wishCount'],
        include: [{
          attributes: {exclude: ['letterNumber', 'finishCondition']},
          model: this.articleModel,
        }],
        ...order,
        offset: start,
        limit: count,
      })

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

  _createConditionByType (type) {
    if (upperCase(type) === VIEW_TYPE.VIEW) {
      return {order: [['viewCount', 'DESC']]}
    }

    if (upperCase(type) === VIEW_TYPE.WISH) {
      return {order: [['wishCount', 'DESC']]}
    }
  }
}
