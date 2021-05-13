// audio元素
export const audioEle = state => state.audioEle
// 播放模式
export const mode = state => state.mode
// 播放状态
export const playing = state => state.playing
// 播放列表
export const playlist = state => state.playlist
// // 当前音乐索引
export const currentIndex = state => state.currentIndex
// 当前音乐
export const currentMusic = state => {
  if (state.playlist.length <= 0){
    return {}
  }
  return state.playlist[state.currentIndex] || {}
}
// 播放历史列表
export const historyList = state => state.historyMusicList

// 当前选择的模块
export const selectBlock = state => state.selectBlock

// 当前播放时间
export const currentTime = state => state.currentTime
