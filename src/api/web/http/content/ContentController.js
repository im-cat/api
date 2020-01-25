import {route, POST, before} from 'awilix-express'
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
}
