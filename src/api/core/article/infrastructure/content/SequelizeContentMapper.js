import {Content} from '../../domain/Content'

export const SequelizeContentMapper = {
  toEntity ({dataValues}) {
    const {
      contentId,
      articleId,
      memberId,
      parentContentId,
      content,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new Content({
      contentId,
      articleId,
      memberId,
      parentContentId,
      content,
      createdAt,
      updatedAt,
      deletedAt,
    })
  },

  toDatabase (dataValues) {
    const {
      articleId,
      memberId,
      parentContentId,
      content,
    } = dataValues

    return {
      articleId,
      memberId,
      parentContentId,
      content,
    }
  },
}
