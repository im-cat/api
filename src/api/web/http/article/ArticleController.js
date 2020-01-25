import {route, POST, GET, before, DELETE} from 'awilix-express'
import {badRequest, notFound, success} from '../../response'
import {token} from '../../../common/passport'
import Status from 'http-status'
import {ArticleSerializer} from './ArticleSerializer'
import {upperCase} from 'lodash'
import {VIEW_TYPES} from '../../../common/viewType'

@before(token({required: true}))
@route('/articles')
export default class ArticleController {
  constructor ({articleService}) {
    this.articleService = articleService
  }

  @POST()
  createMainArticle = async (req, res, next) => {
    try {
      const memberId = req.user
      const result = await this.articleService.createNewArticle(memberId, req.body)

      return success(res, Status.CREATED)(ArticleSerializer.serialize(result))
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

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
      next(error)
    }
  }

  @route('/:articleId')
  @GET()
  show = async (req, res, next) => {
    const {articleId} = req.params

    try {
      const result = await this.articleService.findByArticleId(Number(articleId))

      return success(res, Status.OK)(ArticleSerializer.serializeForDetail(result))
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/:articleId')
  @DELETE()
  delete = async (req, res, next) => {
    const {articleId} = req.params

    try {
      await this.articleService.deleteAllInfoAboutArticles(articleId)
      return res.status(Status.OK).end()
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/:articleId/wish')
  @POST()
  wish = async (req, res, next) => {
    const {articleId} = req.params
    const memberId = req.user

    try {
      const result = await this.articleService.wishOrUnWishArticle(memberId, articleId)

      return success(res, Status.OK)(result)
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

}
