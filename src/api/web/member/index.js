import {Router} from 'express'
import {findByMemberId} from './controller'
import {token} from '../../common/passport'

const router = new Router()

router.get('/:memberId',
  token({required: true}),
  findByMemberId
)

export default router
