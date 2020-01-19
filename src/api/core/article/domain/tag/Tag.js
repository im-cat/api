import {attributes} from 'structure'

export const Tag = attributes({
  tagId: {type: Number},
  text: {type: String, required: true},
  taggedCount: {type: Number},
  createdAt: {type: Date},
})(class Tag {
})
