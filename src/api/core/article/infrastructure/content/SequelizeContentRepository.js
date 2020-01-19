import {SequelizeContentMapper as contentMapper} from './SequelizeContentMapper'

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
}
