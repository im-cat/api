import {createContainer, asClass, InjectionMode, asValue} from 'awilix'
import path from 'path'

import Application from './Application'
import {
  database,
  Article,
  ArticleCount,
  ArticleTag,
  Member,
  MemberToken,
  Taboo,
  Tag
} from './infrastructure/sequelize/models'

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})

// register system
container.register({
  application: asClass(Application).singleton(),
  database: asValue(database),
})

// register core
container.loadModules(
  [
    'core/**/application/*Service.js',
    'core/**/infrastructure/**/*Repository.js',
  ], {
    formatName: 'camelCase',
    register: asClass,
    cwd: path.resolve(__dirname),
  })

// register sequelize models
container.register({
    article: asValue(Article),
    articleCount: asValue(ArticleCount),
    articleTag: asValue(ArticleTag),
    member: asValue(Member),
    memberToken: asValue(MemberToken),
    taboo: asValue(Taboo),
    tag: asValue(Tag)
  }
)

// eslint-disable-next-line no-console
console.log(container)

export default container