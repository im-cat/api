import { Router } from 'express'
import auth from './auth'

const router = new Router()

router.use('/auth', auth)
// eslint-disable-next-line no-unused-vars
router.get('/health-check', (req, res, next) =>
  res.status(200).json({
    healthy: true
  }))

export default router
