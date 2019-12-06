import {success} from '../../common/response/index'

export const findByMemberId = async (req, res, next) => {
  try {
    return success(res, 200)({memberId: 1})
  } catch (e) {
    console.error(e)
  }
}
