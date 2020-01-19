import {attributes} from 'structure'

export const Taboo = attributes({
  tabooId: {type: Number},
  text: {type: String, required: true},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
})(class Taboo {
})
