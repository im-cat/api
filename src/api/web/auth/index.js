import {Router} from 'express'
import {login} from './controller'

const router = new Router()

router.post('/', login)

export default router
