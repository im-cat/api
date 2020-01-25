import {SequelizeTagMapper as tagMapper} from './SequelizeTagMapper'

export default class SequelizeTagRepository {
  constructor ({tag, articleTag}) {
    this.tagModel = tag
    this.articleTagModel = articleTag
  }

  async findByText (text) {
    const tag = await this.tagModel.findOne({where: {text}})
    if (tag) {
      return tagMapper.toEntity(tag)
    }

    return null
  }

  incrementTagCount (tagId) {
    return this.tagModel.increment('taggedCount', {where: {tagId}})
  }

  async createNewTag (tag) {
    const newTag = await this.tagModel.create({text: tag})
    return tagMapper.toEntity(newTag)
  }

  createArticleTag (tagId, articleId) {
    return this.articleTagModel.create({tagId, articleId})
  }

  findTagIdsByArticleId (articleId) {
    return this.articleTagModel.findAll({attributes: ['tagId'], where: {articleId}, raw: true})
  }

  async findTagByTagIds (tagIds) {
    const tags = await this.tagModel.findAll({where: {tagId: tagIds}})
    return tags.map(tagMapper.toEntity)
  }

  async deleteArticleTag (articleId, options = {}) {
    try {
      const articleTags = await this.articleTagModel.findAll({where: {articleId}})
      if (articleTags.length > 0) {
        await articleTags.map(articleTag => articleTag.destroy({...options}))
      }

      return null
    } catch (error) {
      throw error
    }
  }
}
