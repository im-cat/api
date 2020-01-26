import {route, before, PATCH, GET, POST, DELETE} from 'awilix-express'
import {badRequest, success} from '../../response'
import {token} from '../../../common/passport'
import Status from 'http-status'
import {MemberSerializer} from './MemberSerializer'
import {ArticleSerializer} from '../article/ArticleSerializer'
import {upperCase} from 'lodash'

@before(token({required: true}))
@route('/members')
export default class ContentController {
  constructor ({memberService}) {
    this.memberService = memberService
  }

  @PATCH()
  updateMember = async (req, res, next) => {
    try {
      const memberId = req.user
      const result = await this.memberService.updateMember(memberId, req.body)

      return success(res, Status.OK)(MemberSerializer.serialize(result))
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @GET()
  findMember = async (req, res, next) => {
    try {
      const memberId = req.user
      const result = await this.memberService.findMember(memberId)

      return success(res, Status.OK)(MemberSerializer.serialize(result))
    } catch (error) {
      next(error)
    }
  }

  @route('/:memberId/follow')
  @POST()
  follow = async (req, res, next) => {
    try {
      const followerId = req.user
      const {memberId: followingId} = req.params
      await this.memberService.followMember(followerId, followingId)

      return success(res, Status.OK)({created: true})
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/:memberId/follow')
  @DELETE()
  unFollow = async (req, res, next) => {
    try {
      const followerId = req.user
      const {memberId: followingId} = req.params
      await this.memberService.unFollowMember(followerId, followingId)

      return success(res, Status.OK)({deleted: true})
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }

  @route('/follow')
  @GET()
  findFollowerList = async (req, res, next) => {
    try {
      const memberId = req.user
      const type = req.query.type
      const start = Number(req.query.start) || 0
      const count = Number(req.query.count) || 10

      if (['FOLLOWER', 'FOLLOWING'].indexOf(upperCase(type)) === -1) {
        const error = new Error('ValidationError')
        error.details = 'Invalid type'

        return badRequest(res, {message: error.details})
      }

      const follows = await this.memberService.findFollowList(memberId, start, count, type)

      follows.items = follows.items.map(MemberSerializer.serialize)

      return success(res, Status.OK)(follows)
    } catch (error) {
      next(error)
    }
  }

  @route('/wish-articles')
  @GET()
  findMyWishArticle = async (req, res, next) => {
    try {
      const memberId = req.user
      const start = Number(req.query.start) || 0
      const count = Number(req.query.count) || 10

      const articles = await this.memberService.findMyWishArticle(memberId, start, count)

      articles.items = articles.items.map(ArticleSerializer.serializeForGet)

      return success(res, Status.OK)(articles)
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, {code: error.code, message: error.details})
      }

      next(error)
    }
  }
}
