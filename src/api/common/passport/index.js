import passport from 'passport'
import {Strategy} from 'passport-http-bearer'
import {getAccessToken} from '../../infrastructure/sequelize/models/MemberToken'

passport.use('token', new Strategy((accessToken, done) => {
  getAccessToken(accessToken)
    .then(data => {
      if (!data) {
        done(null, false)
        return null
      }
      done(null, data)
      return null
    })
    .catch(done)
}))

export const token = ({required} = {}) => (req, res, next) =>
  passport.authenticate('token', {session: false}, (err, accessToken) => {
    if (err || (required && !accessToken)) {
      return res.status(401).end()
    }

    req.logIn(accessToken.memberId, {session: false}, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)


