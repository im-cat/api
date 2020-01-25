import {SequelizeContentMapper as contentMapper} from './SequelizeContentMapper'
import messages from '../../../../common/messages/message'

export default class SequelizeContentRepository {
  constructor ({content, report}) {
    this.contentModel = content
    this.reportModel = report
  }

  async createContent (content) {
    const {valid, errors} = content.validate()

    if (!valid) {
      const error = new Error('ValidationError')
      error.details = errors

      throw error
    }

    const newContent = await this.contentModel.create(contentMapper.toDatabase(content))
    return contentMapper.toEntity(newContent)
  }

  async countContent (articleId) {
    return this.contentModel.count({where: {articleId}})
  }

  async deleteContentByArticleId (articleId, options = {}) {
    const contents = await this.contentModel.findAll({where: {articleId}})
    if (contents.length > 0) {
      await contents.map(content => content.destroy({...options}))
    }
    return null
  }

  async findContentById (id) {
    try {
      const content = await this.contentModel.findByPk(id, {rejectOnEmpty: true})

      return contentMapper.toEntity(content)
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError')
        notFoundError.code = messages.E006.code
        notFoundError.details = messages.E006.detail

        throw notFoundError
      }

      throw error
    }
  }

  reportContent (memberId, articleId, contentId, text) {
    try {
      return this.reportModel.create({memberId, articleId, contentId, text})
    } catch (error) {
      throw error
    }
  }
}
