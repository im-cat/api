import {convertDatetime} from '../../../common/utils/convertDatetime'
import {MemberSerializer} from '../member/MemberSerializer'

export const ContentSerializer = {
  serialize ({
    contentId,
    articleId,
    memberId,
    member,
    parentContentId,
    content,
    createdAt,
    updatedAt,
    deletedAt
  }) {
    member = MemberSerializer.serialize(member)
    createdAt = convertDatetime(createdAt)
    updatedAt = convertDatetime(updatedAt)
    deletedAt = convertDatetime(deletedAt)

    return {
      contentId,
      articleId,
      memberId,
      member,
      parentContentId,
      content,
      createdAt,
      updatedAt,
      deletedAt
    }
  }
}
