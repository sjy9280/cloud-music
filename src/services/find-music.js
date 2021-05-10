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
    method: 'GET',
    url: '/personalized/mv'
  })
}

// 歌单页所有分类
export const getSongListCategories = () => {
  return request({
    method: 'GET',
    url: '/playlist/catlist'
  })
}

// 歌单页热门分类
export const getSongListHotCategories = () => {
  return request({
    method: 'GET',
    url: '/playlist/hot'
  })
}

// 所有歌单--网友精选碟
export const getAllSongList = (params) => {
  return request({
    method: 'GET',
    url: '/top/playlist',
    params
  })
}

// 主播电台banner
export const getDjBanner = () => {
  return request({
    method: 'GET',
    url: '/dj/banner'
  })
}

// 排行榜
export const getRankList = () => {
  return request({
    method: 'GET',
    url: '/toplist'
  })
}

// 获取歌单详情
export const getPlayListDetail = (params) => {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    params
  })
}
