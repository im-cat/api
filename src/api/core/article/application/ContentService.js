import {Content} from '../domain/Content'

export default class ContentService {
  constructor ({sequelizeContentRepository, sequelizeArticleRepository}) {
    this.contentRepository = sequelizeContentRepository
    this.articleRepository = sequelizeArticleRepository
  }

  createNewContent = async (memberId, contentReqData) => {
    try {
      // 존재하는 아티클인지 확인 필요
      const {articleId} = contentReqData
      await this.articleRepository.findArticleById(articleId)

      const content = new Content(Object.assign(contentReqData, {memberId}))
      const newContent = await this.contentRepository.createContent(content)

      return newContent
    } catch (error) {
      throw error
    }
  }
}
