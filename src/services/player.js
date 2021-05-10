import request from '@/utils/request'

export const getLyric = (params) => {
  return request({
    method: 'GET',
    url: '/lyric',
    params
  })
}

export const getSong = (params) => {
  return request({
    method: 'GET',
    url: '/song/url',
    params
  })
}
