import request from '@/utils/request'

// 发现音乐的轮播图
export const getBannerPics = () => {
  return request({
    method: 'GET',
    url: '/banner',
  })
}

// 独家放送
export const getExclusiveMusic = () => {
  return request({
    method: 'GET',
    url: '/personalized/privatecontent'
  })
}

// 推荐歌单
export const getRecommendSongsList = () => {
  return request({
    method: 'GET',
    url: '/personalized'
  })
}

// 推荐MV
export const getRecommendMV = () => {
  return request({
    method:'GET',
    url: '/personalized/mv'
  })
}
