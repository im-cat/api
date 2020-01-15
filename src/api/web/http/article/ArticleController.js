import {route, POST, before} from 'awilix-express'
import {badRequest, success} from '../../response'
import {token} from '../../../common/passport'
import {TagCreationException} from '../../../core/article/domain/TagCreationException'
import {TabooException} from '../../../core/article/domain/TabooException'
import {ArticleCreationException} from '../../../core/article/domain/ArticleCreationException'

@route('/articles')
export default class ArticleController {
  constructor ({articleService}) {
    this.articleService = articleService
  }

  @before(token({required: true}))
  @POST()
  createMainArticle = async (req, res, next) => {
    try {
      const memberId = req.user
      const result = await this.articleService.createNewArticle(memberId, req.body)

      return success(res, 201)({...result})
    } catch (err) {
      if (err instanceof TagCreationException || TabooException || ArticleCreationException) {
        badRequest(res, {code: 400, message: err.message})
      }
      next(err)
    }
  }
}
