import {convertDatetime} from '../../../common/utils/convertDatetime'

export const ArticleSerializer = {
  serialize ({
    articleId,
    memberId,
    title,
    mainText,
    image,
    letterNumber,
    finishCondition,
    isFinish,
    tags,
    createdAt,
    updatedAt,
    deletedAt
  }) {
    createdAt = convertDatetime(createdAt)
    updatedAt = convertDatetime(updatedAt)
    deletedAt = convertDatetime(deletedAt)

    return {
      articleId,
      memberId,
      title,
      mainText,
      image,
      letterNumber,
      finishCondition,
      isFinish,
      tags,
      createdAt,
      updatedAt,
      deletedAt,
    }
  },

  serializeForGet ({
    articleId,
    memberId,
    title,
    mainText,
    image,
    wishCount,
    viewCount,
    createdAt,
    updatedAt,
    deletedAt
  }) {
    createdAt = convertDatetime(createdAt)
    updatedAt = convertDatetime(updatedAt)
    deletedAt = convertDatetime(deletedAt)

    return {
      articleId,
      memberId,
      title,
      mainText,
      image,
      wishCount,
      viewCount,
      createdAt,
      updatedAt,
      deletedAt,
    }
  },
  serializeForDetail ({
    articleId,
    memberId,
    title,
    mainText,
    image,
    letterNumber,
    finishCondition,
    isFinish,
    wishCount,
    viewCount,
    createdAt,
    updatedAt,
    deletedAt
  }) {
    createdAt = convertDatetime(createdAt)
    updatedAt = convertDatetime(updatedAt)
    deletedAt = convertDatetime(deletedAt)

    return {
      articleId,
      memberId,
      title,
      mainText,
      image,
      letterNumber,
      finishCondition,
      isFinish,
      wishCount,
      viewCount,
      createdAt,
      updatedAt,
      deletedAt,
    }
  }
}
