import { db } from '../../../common/config'
import Sequelize from 'sequelize'
import ModelsLoader from '../ModelsLoader'

let sequelize

if (db.uri && db.uri.length > 0) {
  sequelize = new Sequelize(db.uri, db.options)
} else {
  sequelize = new Sequelize(db.options)
}

module.exports = ModelsLoader({
  sequelize,
  baseFolder: __dirname,
})
