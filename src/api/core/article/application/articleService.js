import {ArticleDomain} from '../domain/articleDomain'
import {ArticleCountDomain} from '../domain/articleCountDomain'
import {TabooDomain} from '../domain/tabooDomain'
import {TagDomain} from '../domain/tagDomain'

import {ArticleDao} from '../infrastructure/articleDao'
import {TabooDao} from '../infrastructure/tabooDao'
import {TagDao} from '../infrastructure/tagDao'

import {TabooException} from '../domain/tabooException'

export class ArticleService {

  async createNewArticle (memberId, newArticleReqData){
    const {title, mainText, letterNumber, finishCondition, tags} = newArticleReqData

    await _checkTaboo(title)
    await _checkTaboo(tags)

    const articleData = {memberId, title, mainText, letterNumber, finishCondition}

    const articleDomain = new ArticleDomain(new ArticleDao())
    const articleInfo = await articleDomain.createArticle(articleData)

    const articleId = articleInfo.articleId

    const articleCountDomain = new ArticleCountDomain(new ArticleDao())
    await articleCountDomain.createArticleCount(articleId)

    const tagDomain = new TagDomain(new TagDao())
    await tagDomain.createTag(tags, articleId)

    return articleInfo
  }
}

const _checkTaboo = async (text) => {
  const tabooDomain = new TabooDomain(new TabooDao())
  const isExistTaboo = await tabooDomain.isExistTaboo(text)

  if (isExistTaboo) {
    throw new TabooException()
  }
}
