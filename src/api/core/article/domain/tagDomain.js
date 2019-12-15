import {TagCreationException} from './tagCreationException'

export class TagDomain {
  constructor (dao) {
    this.dao = dao
  }

  async createTag (tags, articleId) {
    if (tags.length > 5) {
      throw new TagCreationException()
    }

    for (const tag of tags) {
      let tagInfo = await this.dao.findByText(tag, {raw: true})

      if (tagInfo) {
        await this.dao.incrementTagCount(tagInfo.tagId)
      }

      if (!tagInfo) {
        tagInfo = await this.dao.createTag(tag)
      }

      await this.dao.createArticletag(tagInfo.tagId, articleId)
    }
  }
}

