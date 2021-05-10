import request from '@/utils/request'

// 获取歌单评论
export const getSongListComments = (params) => {
  return request({
    methods: 'GET',
    url: '/comment/playlist',
    params
  })
}

// 获取歌单收藏者
export const getSongListCollectors = (params) => {
  return request({
    methods: 'GET',
    url: '/playlist/subscribers',
    params
  })
}

// 获取歌单歌曲列表
export const getCollectedSongs = (params) => {
  return request({
    method: 'GET',
    url: '/song/detail',
    params
  })
}
