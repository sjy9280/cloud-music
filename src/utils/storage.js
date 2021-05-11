const _storage = window.localStorage
const storage = {
  get (key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  set (key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear (key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

const PLAY_SONG_LIST = '__music_song_list__'
const CURRENT_INDEX = '__music_current_index__'
const HISTORY_MUSIC_LIST = '__music_history_list__'
const MODE_KEY = '__music_play_mode__'

const HistoryListMAX = 200

// 获取播放的歌单
export function getPlaySongList () {
  return storage.get(PLAY_SONG_LIST)
}

// 设置当前播放歌单
export function setPlaySongList (list) {
  storage.set(PLAY_SONG_LIST, JSON.stringify(list))
}

// // 更新当前播放列表
// export function updatePlaySongList (musicList) {
//   let list = getPlaySongList()
//   let currentIndex = getCurrentMusicIndex()
//   list.splice(currentIndex + 1, 0, musicList)
//   setPlaySongList(list)
// }

// 获取当前音乐的index
export function getCurrentMusicIndex () {
  return storage.get(CURRENT_INDEX)
}

// 设置当前音乐的index
export function setCurrentMusicIndex (index) {
  storage.set(CURRENT_INDEX, index)
}

// // 获取播放历史
export function getHistoryMusicList () {
  return storage.get(HISTORY_MUSIC_LIST)
}

// // 更新播放历史
export function setHistoryList (music) {
  let list = storage.get(HISTORY_MUSIC_LIST)
  const index = list.findIndex(item => {
    return item.id === music.id
  })
  if (index === 0) {
    return list
  }
  if (index > 0) {
    list.splice(index, 1)
  }
  list.unshift(music)
  if (HistoryListMAX && list.length > HistoryListMAX) {
    list.pop()
  }
  storage.set(HISTORY_MUSIC_LIST, JSON.stringify(list))
  return list
}

// // 删除一条播放历史
export function removeHistoryList (music) {
  storage.set(HISTORY_MUSIC_LIST, JSON.stringify(music))
  return music
}

// // 清空播放历史
export function clearHistoryList () {
  storage.clear(HISTORY_MUSIC_LIST)
  return []
}

// 获取播放模式
export function getMode () {
  return storage.get(MODE_KEY, null)
}

// 修改播放模式
export function setMode (mode) {
  storage.set(MODE_KEY, mode)
  return mode
}

