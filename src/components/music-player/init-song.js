export class Song {
  constructor (song, url = '', id) {
    this.name = song.name
    this.artist = song.ar
    this.src = url
    this.pic = song.al.picUrl || ''
    this.id = id
    this.duration = song.dt
  }
}

// 用于格式化歌词
export class lyricItem {
  constructor (time, lyric) {
    this.time = time
    this.lyric = lyric
  }
}
