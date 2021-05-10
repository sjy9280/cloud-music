import { getHistoryList, getLastSongList } from '@/utils/storage'

const state = {
  block_selected: window.localStorage.getItem('block_selected') || 0,
  audioEle: null, // audio元素
  playing: false, // 播放状态
  playlist: getLastSongList() || [], // 播放列表
  orderList: getLastSongList() || [], // 顺序列表
  currentIndex: 0, // 当前音乐索引
  historyList: getHistoryList() || [], // 播放历史列表
}

export default state
