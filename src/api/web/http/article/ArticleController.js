import {route, POST, GET, before} from 'awilix-express'
import {badRequest, success} from '../../response'
import {token} from '../../../common/passport'
import Status from 'http-status'
import {ArticleSerializer} from './ArticleSerializer'
import {upperCase} from 'lodash'
import {VIEW_TYPES} from '../../../common/viewType'

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

  @before(token({required: true}))
  @GET()
  index = async (req, res, next) => {
    const start = Number(req.query.start) || 0
    const count = Number(req.query.count) || 10
    const {type} = req.query

    try {
      if (VIEW_TYPES.indexOf(upperCase(type)) === -1) return badRequest(res, {message: 'Invalid type'})

      const articles = await this.articleService.findAllArticle(start, count, type)

      articles.items = articles.items.map(ArticleSerializer.serializeForGet)

      return success(res, Status.OK)(articles)
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return badRequest(res, {code: Status.NOT_FOUND, message: error.details})
      }

      next(error)
    }
  }
}
