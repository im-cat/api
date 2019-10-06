import {Router} from 'express'
import {login} from './controller'

const router = new Router()

router.post('/login', login)

export default router
