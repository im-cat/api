import {TagCreationException} from '../domain/tag/TagCreationException'

export default class TagService {
  constructor ({sequelizeTagRepository}) {
    this.tagRepository = sequelizeTagRepository
  }

  createTag = async (tags, articleId) => {
    try {
      tags = [...new Set(tags)]

      if (tags.length > 5) {
        throw new TagCreationException()
      }

      const resultOfTagGenerated = []

      for (const tag of tags) {
        let tagInfo = await this.tagRepository.findByText(tag)

        if (tagInfo) {
          await this.tagRepository.incrementTagCount(tagInfo.tagId)
        }

        if (!tagInfo) {
          tagInfo = await this.tagRepository.createNewTag(tag)
        }

        await this.tagRepository.createArticleTag(tagInfo.tagId, articleId)

        resultOfTagGenerated.push(tagInfo.text)
      }

      return resultOfTagGenerated
    } catch (error) {
      throw error
    }
  }

  async findArticleTags (articleId) {
    const tagIds = await this.tagRepository
      .findTagIdsByArticleId(articleId)
      .map(i => i.tagId)

    if (tagIds.length === 0) {
      return []
    }

    const tags = await this.tagRepository.findTagByTagIds(tagIds)
    const tagTexts = tags.map(tag => tag.text)

    return tagTexts
  }
}
