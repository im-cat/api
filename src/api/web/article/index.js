import {Router} from 'express'
import {createMainArticle} from './controller'
import {token} from '../../common/passport'

const router = new Router()

router.post('/', token({required: true}), createMainArticle)

export default router
