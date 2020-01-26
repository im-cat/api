import {Content} from '../domain/content/Content'
import {ContentNoPermissionException} from '../domain/content/ContentNoPermissionException'

export default class ContentService {
  constructor ({sequelizeContentRepository, sequelizeArticleRepository, sequelizeMemberRepository}) {
    this.contentRepository = sequelizeContentRepository
    this.articleRepository = sequelizeArticleRepository
    this.memberRepository = sequelizeMemberRepository
  }

  createNewContent = async (memberId, contentReqData) => {
    const {articleId} = contentReqData

    try {
      const article = await this.articleRepository.findArticleById(articleId)
      const contentCount = await this.contentRepository.countContent(articleId)
      article.checkCanWriteMore(contentCount)

      const content = new Content(Object.assign(contentReqData, {memberId}))
      content.checkTheNumberOfLetters(article.letterNumber)

      const newContent = await this.contentRepository.createContent(content)

      const member = await this.memberRepository.findMemberByMemberId(memberId)

      return {...newContent.attributes, member}
    } catch (error) {
      if (error.message === 'ValidationError' && error.code === 'E001') {
        this.articleRepository.updateArticleIsFinish(articleId)
        throw error
      }
      throw error
    }
  }

  deleteContentByArticleId = async (articleId) => {
    try {
      await this.contentRepository.delete
    } catch (error) {
      throw error
    }
  }

  reportContent = async (memberId, reportReqData) => {
    const {articleId, contentId, text} = reportReqData
    try {
      await this.articleRepository.findArticleById(articleId)
      await this.contentRepository.findContentById(contentId)
      await this.contentRepository.reportContent(memberId, articleId, contentId, text)

      return null
    } catch (error) {
      throw error
    }
  }

  findContents = async (articleId, parentContentId, start, count) => {
    try {
      await this.articleRepository.findArticleById(articleId)
      const contents = await this.contentRepository.findContents(articleId, parentContentId, start, count)

      return contents
    } catch (error) {
      throw error
    }
  }

  updateContent = async (memberId, contentId, contentReqData) => {
    try {
      const content = await this.contentRepository.findContentById(contentId)

      if (memberId !== content.memberId) {
        return new ContentNoPermissionException()
      }

      const updatedContent = await this.contentRepository.updateContent(contentId, contentReqData)
      const member = await this.memberRepository.findMemberByMemberId(memberId)

      return {...updatedContent.attributes, member}
    } catch (error) {
      throw error
    }
  }

  deleteContent = async (memberId, contentId) => {
    try {
      const content = await this.contentRepository.findContentById(contentId)

      if (memberId !== content.memberId) {
        return new ContentNoPermissionException()
      }

      await this.contentRepository.deleteContent(contentId)

      return null
    } catch (error) {
      throw error
    }
  }
}
