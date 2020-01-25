import {attributes} from 'structure'

export const Article = attributes({
  articleId: {type: Number},
  memberId: {type: Number, required: true},
  title: {type: String, required: true},
  mainText: {type: String, required: true},
  letterNumber: {type: Number},
  finishCondition: {type: Number},
  isFinish: {type: Number},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
})(class Article {
})
