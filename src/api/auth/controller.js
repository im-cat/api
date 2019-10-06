import {sign} from '../../services/jwt'
import {success} from '../../services/response/'
import {User} from 'services/sequelize/models'

export const login = async (req, res, next) => {
  try {
    const userId = req.body.id
    const user = await User.findOne({where: {userId}})

    console.log(user)

    if (user) {
      return sign(user.id)
        .then((token) => ({token}))
        .then(success(res, 201))
        .catch(next)
    }

    const createdUser = await User.create({userId, service: 'apple'})
    return sign(createdUser.id)
      .then((token) => ({token}))
      .then(success(res, 201))
      .catch(next)
  } catch (e) {
    console.error(e)
  }
}
