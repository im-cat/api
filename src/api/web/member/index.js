import {Router} from 'express'
import {findByMemberId} from './controller'

const router = new Router()

router.get('/:memberId', findByMemberId)

export default router
