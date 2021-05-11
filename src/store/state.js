import { getCurrentMusicIndex, getHistoryMusicList, getPlaySongList } from '@/utils/storage'

const state = {
  block_selected: window.localStorage.getItem('block_selected') || 0,
  audioEle: null, // audio元素
  playing: false, // 播放状态
  playlist: getPlaySongList() || [], // 播放列表
  currentIndex: getCurrentMusicIndex(), // 当前音乐索引
  historyMusicList: getHistoryMusicList || [],
  playMode: 0

}

export default state
