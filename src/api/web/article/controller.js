import {success, badRequest} from '../../common/response'
import {ArticleService} from '../../core/article/application/articleService'
import {TagCreationException} from '../../core/article/domain/tagCreationException'
import {TabooException} from '../../core/article/domain/tabooException'
import {ArticleCreationException} from '../../core/article/domain/articleCreationException'

export const createMainArticle = async (req, res, next) => {
  // TODO: memberId는 token > req.member
  try {
    const articleService = new ArticleService()
    const result = await articleService.createNewArticle(req.body)

    return success(res, 201)({...result})
  } catch (err) {

    if (err instanceof TagCreationException || TabooException || ArticleCreationException) {
      badRequest(res, {code: 400, message: err.message})
    }

    next(err)
  }
}
