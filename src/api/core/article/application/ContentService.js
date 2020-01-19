import {Content} from '../domain/content/Content'

export default class ContentService {
  constructor ({sequelizeContentRepository, sequelizeArticleRepository}) {
    this.contentRepository = sequelizeContentRepository
    this.articleRepository = sequelizeArticleRepository
  }

  createNewContent = async (memberId, contentReqData) => {
    try {
      const {articleId} = contentReqData
      const article = await this.articleRepository.findArticleById(articleId)

      const content = new Content(Object.assign(contentReqData, {memberId}))
      content.checkTheNumberOfLetters(article.letterNumber)

      const newContent = await this.contentRepository.createContent(content)

      return newContent
    } catch (error) {
      throw error
    }
  }
}
