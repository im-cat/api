import {Content} from '../domain/content/Content'

export default class ContentService {
  constructor ({sequelizeContentRepository, sequelizeArticleRepository, sequelizeMemberRepository}) {
    this.contentRepository = sequelizeContentRepository
    this.articleRepository = sequelizeArticleRepository
    this.memberRepository = sequelizeMemberRepository
  }

  createNewContent = async (memberId, contentReqData) => {
    try {
      const {articleId} = contentReqData
      const article = await this.articleRepository.findArticleById(articleId)
      const contentCount = await this.contentRepository.countContent(articleId)
      article.checkCanWriteMore(contentCount)

      const content = new Content(Object.assign(contentReqData, {memberId}))
      content.checkTheNumberOfLetters(article.letterNumber)

      const newContent = await this.contentRepository.createContent(content)

      const member = await this.memberRepository.findMemberByMemberId(memberId)

      return {...newContent.attributes, member}
    } catch (error) {
      throw error
    }
  }
}
