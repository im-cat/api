import {route, POST, before} from 'awilix-express'
import {badRequest, success} from '../../response'
import {token} from '../../../common/passport'
import Status from 'http-status'
import {ArticleSerializer} from './ArticleSerializer'

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

      return success(res, Status.CREATED)(ArticleSerializer.serialize(result))
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: Status.BAD_REQUEST, message: error.details})
      }

      next(error)
    }
  }
}
