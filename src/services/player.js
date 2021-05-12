import request from '@/utils/request'

// 获取歌词
export const getLyric = (params) => {
  return request({
    method: 'GET',
    url: '/lyric',
    params
  })
}

// 获取歌曲
export const getSong = (params) => {
  return request({
    method: 'GET',
    url: '/song/url',
    params
  })
}

// 获取歌曲评论
export const getSongComments = (params) => {
  return request({
    methods: 'GET',
    url: '/comment/music',
    params
  })
}
