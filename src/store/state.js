import { getCurrentMusicIndex, getHistoryMusicList, getPlaySongList, getSelectBlock } from '@/utils/storage'

const state = {
  selectBlock: getSelectBlock() || 0,
  audioEle: null, // audio元素
  playing: false, // 播放状态
  playlist: getPlaySongList() || [], // 播放列表
  currentIndex: getCurrentMusicIndex(), // 当前音乐索引
  historyMusicList: getHistoryMusicList || [],
  playMode: 0,
  currentTime: 0 // 记录当前播放时间

}

export default state
