import {attributes} from 'structure'

export const Content = attributes({
  contentId: {type: Number},
  articleId: {type: Number, required: true},
  memberId: {type: Number, required: true},
  parentContentId: {type: Number},
  content: {type: String, required: true},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
})(class Content {
})
