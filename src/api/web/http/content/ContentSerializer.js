import {convertDatetime} from '../../../common/utils/convertDatetime'

export const ContentSerializer = {
  serialize ({
    contentId,
    articleId,
    memberId,
    parentContentId,
    content,
    createdAt,
    updatedAt,
    deletedAt
  }) {
    createdAt = convertDatetime(createdAt)
    updatedAt = convertDatetime(updatedAt)
    deletedAt = convertDatetime(deletedAt)

    return {
      contentId,
      articleId,
      memberId,
      parentContentId,
      content,
      createdAt,
      updatedAt,
      deletedAt
    }
  }
}
