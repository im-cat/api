import {Router} from 'express'
import {createMainArticle} from './controller'

const router = new Router()

router.post('/', createMainArticle)

export default router
