import {Tag, ArticleTag} from '../models'

export class TagDao {

  findByText (text, option = {}) {
    return Tag.findOne({where: {text}, ...option})
  }

  async createTag (tag) {
    const tagInfo = await Tag.create({text: tag})
    return tagInfo.toJSON()
  }

  incrementTagCount (tagId) {
    return Tag.increment('taggedCount', {where: {tagId}})
  }

  createArticletag (tagId, articleId) {
    return ArticleTag.create({tagId, articleId})
  }
}
