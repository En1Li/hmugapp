import fly from '../utils/request.js'
export const getGoodsList = (data) => {
  return fly.get('/goods/search', data)
}
