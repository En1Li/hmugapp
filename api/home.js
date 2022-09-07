import fly from '@/utils/request.js'
export const getBanners = () => {
  return fly.get('/home/swiperdata')
}
export const getNavList = () => {
  return fly.get('/home/catitems')
}
// 获取楼层数据
export const getFloors = () => {
  return fly.get('/home/floordata')
}
