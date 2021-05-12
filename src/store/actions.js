import * as types from '@/store/mutation-types'
import {
  clearHistoryList,
  removeHistoryList,
  setCurrentMusicIndex,
  setHistoryList,
  setMode,
  setPlaySongList, setSelectedBlock
} from '@/utils/storage'

// 设置播放列表
export const setPlaylist = function ({ commit }, { list }) {
  commit(types.SET_PLAYLIST, list)
  setPlaySongList(list)
}

// 设置播放的index
export const setCurrentIndex = function ({ commit }, { index }) {
  commit(types.SET_CURRENTINDEX, index)
  setCurrentMusicIndex(index)
}

function findIndex (list, music) {
  return list.findIndex(item => {
    return item.id === music.id
  })
}

// 选择播放（会更新整个播放列表）
export const selectPlay = function ({ commit }, { list, index }) {
  commit(types.SET_PLAYLIST, list)
  setPlaySongList(list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_PLAYING, true)
}

// 添加到播放列表
export const selectAddPlay = function ({ commit, state }, musicList) {
  let list = [...state.playlist]
  // 查询当前播放列表是否有代插入的音乐，并返回其索引值
  for (let i = 0; i < musicList.length; i++) {
    let index = findIndex(list, musicList[i])
    // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
    list.splice(index, 1)
  }
  list.splice(state.currentIndex + 1, 0, musicList)
  commit(types.SET_PLAYLIST, list)
  setPlaySongList(list)
  commit(types.SET_PLAYING, true)
}

// 清空播放列表
export const clearPlayList = function ({ commit }) {
  commit(types.SET_PLAYING, false)
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_PLAYLIST, [])
  setPlaySongList([])
}

// 设置选中的模块
export const setSelectBlock = function ({ commit }, { index }) {
  console.log(index)
  commit(types.SET_SELECT_BLOCK, index)
  setSelectedBlock(index)
}
//
// // 删除正在播放列表中的歌曲
// export const removerPlayListItem = function (
//   { commit, state },
//   { list, index }
// ) {
//   let currentIndex = state.currentIndex
//   if (index < state.currentIndex || list.length === state.currentIndex) {
//     currentIndex--
//     commit(types.SET_CURRENTINDEX, currentIndex)
//   }
//   commit(types.SET_PLAYLIST, list)
//   commit(types.SET_ORDERLIST, list)
//   if (!list.length) {
//     commit(types.SET_PLAYING, false)
//   } else {
//     commit(types.SET_PLAYING, true)
//   }
// }
// 设置播放历史
export const setHistory = function ({ commit }, music) {
  setHistoryList(music)
}
// 删除播放历史
export const removeHistory = function ({ commit }, music) {
  removeHistoryList(music)
}
// 清空播放历史
export const clearHistory = function ({ commit }) {
  clearHistoryList()
}
// 设置播放模式
export const setPlayMode = function ({ commit }, mode) {
  setMode(mode)
}
