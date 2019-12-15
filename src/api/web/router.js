import {Router} from 'express'
import auth from './auth'
import member from './member'
import article from './article'

const router = new Router()

router.use('/auth', auth)
router.use('/members', member)
router.use('/articles', article)
router.get('/health-check', (req, res) => res.status(200).json({healthy: true}))

export default router
