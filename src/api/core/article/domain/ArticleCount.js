import {attributes} from 'structure'

export const ArticleCount = attributes({
  articleCountId: {type: Number},
  articleId: {type: Number, required: true},
  viewCount: {type: String},
  wishCount: {type: String},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
})(class ArticleCount {
})
