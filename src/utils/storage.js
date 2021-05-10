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

const HISTORY_LIST = '__music_historyList__'
const LAST_SONG_LIST = '__music_song_list__'
const CURRENT_INDEX = '__current_song_index__'
const HistoryListMAX = 200

// 获取播放的歌单
export function getLastSongList () {
  return storage.get(LAST_SONG_LIST)
}

// 设置当前播放歌单
export function setLastSongList (list) {
  storage.set(LAST_SONG_LIST, JSON.stringify(list))
}

// 获取播放历史
export function getHistoryList () {
  return storage.get(HISTORY_LIST)
}

// 更新播放历史
export function setHistoryList (music) {
  let list = storage.get(HISTORY_LIST)
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
  storage.set(HISTORY_LIST, JSON.stringify(list))
  return list
}

// 删除一条播放历史
export function removeHistoryList (music) {
  storage.set(HISTORY_LIST, JSON.stringify(music))
  return music
}

// 清空播放历史
export function clearHistoryList () {
  storage.clear(HISTORY_LIST)
  return []
}

const MODE_KEY = '__music_play_mode__'

// 获取播放模式
export function getMode () {
  return storage.get(MODE_KEY, null)
}

// 修改播放模式
export function setMode (mode) {
  storage.set(MODE_KEY, mode)
  return mode
}

// 设置索引
export function setCurrentIndex (index) {
  storage.set(CURRENT_INDEX, index)
}

// 获取索引
export function getCurrentIndex () {
  return storage.get(CURRENT_INDEX)
}




