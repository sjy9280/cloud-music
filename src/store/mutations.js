import * as types from './mutation-types'

const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE] (state, audioEle) {
    state.audioEle = audioEle
  },
  // 修改播放状态
  [types.SET_PLAYING] (state, playing) {
    state.playing = playing
  },

  // // 修改播放列表
  [types.SET_PLAYLIST] (state, playlist) {
    state.playlist = playlist
  },

  // 修改播放模式
  [types.SET_PLAYMODE] (state, mode) {
    state.playMode = mode
  },

  // 修改播放列表
  [types.SET_PLAYLIST] (state, playlist) {
    state.playlist = playlist
  },

  // 修改当前音乐索引
  [types.SET_CURRENTINDEX] (state, currentIndex) {
    state.currentIndex = currentIndex
  },
  // 修改播放历史列表
  [types.SET_HISTORYLIST] (state, historyList) {
    state.historyMusicList = historyList
  },
  // 修改选中的模块
  [types.SET_SELECT_BLOCK] (state,index){
      state.selectBlock = index
  }
}

export default mutations
