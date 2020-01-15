export default class SequelizeTagRepository {
  constructor ({tag, articleTag}) {
    this.tagModel = tag
    this.articleTagModel = articleTag
  }

  findByText (text, option = {}) {
    return this.tagModel.findOne({where: {text}, ...option})
  }

  async createNewTag (tag) {
    const tagInfo = await this.tagModel.create({text: tag})
    return tagInfo.toJSON()
  }

  incrementTagCount (tagId) {
    return this.tagModel.increment('taggedCount', {where: {tagId}})
  }

  createArticletag (tagId, articleId) {
    return this.articleTagModel.create({tagId, articleId})
  }
}
