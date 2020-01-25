import {route, POST, before, GET, PATCH, DELETE} from 'awilix-express'
import {badRequest, notFound, success} from '../../response'
import {token} from '../../../common/passport'
import Status from 'http-status'
import {ContentSerializer} from './ContentSerializer'

@before(token({required: true}))
@route('/contents')
export default class ContentController {
  constructor ({contentService}) {
    this.contentService = contentService
  }

  @POST()
  createContent = async (req, res, next) => {
    try {
      const memberId = req.user
      const result = await this.contentService.createNewContent(memberId, req.body)

      return success(res, Status.CREATED)(ContentSerializer.serialize(result))
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/report')
  @POST()
  reportContent = async (req, res, next) => {
    try {
      const memberId = req.user
      await this.contentService.reportContent(memberId, req.body)

      return res.status(Status.OK).end()
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @GET()
  index = async (req, res, next) => {
    try {
      const {articleId, parentContentId} = req.query
      const start = Number(req.query.start) || 0
      const count = Number(req.query.count) || 10

      const contents = await this.contentService.findContents(articleId, parentContentId, start, count)
      contents.items = contents.items.map(ContentSerializer.serialize)

      return success(res, Status.OK)(contents)
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/:contentId')
  @PATCH()
  update = async (req, res, next) => {
    const memberId = req.user
    const {contentId} = req.params

    try {
      const result = await this.contentService.updateContent(memberId, contentId, req.body)

      return success(res, Status.OK)(ContentSerializer.serialize(result))
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/:contentId')
  @DELETE()
  delete = async (req, res, next) => {
    const memberId = req.user
    const {contentId} = req.params

    try {
      await this.contentService.deleteContent(memberId, contentId)

      return res.status(Status.OK).end()
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return notFound(res, {code: error.code, message: error.details})
      }

      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }
}
