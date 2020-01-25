import {SequelizeContentMapper as contentMapper} from './SequelizeContentMapper'
import messages from '../../../../common/messages/message'

export default class SequelizeContentRepository {
  constructor ({content}) {
    this.contentModel = content
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
}
