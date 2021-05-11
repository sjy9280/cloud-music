import { playMode } from '@/config'

let retry = 1

const musicPlayer = {
  initAudio (that) {
    const ele = that.audioEle

    // 音频缓冲事件
    ele.onprogress = () => {
      try {
        if (ele.buffer.length > 0) {
          const duration = that.currentMusic.duration
          let buffered = 0
          ele.buffered.end(0)
          buffered = ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
          that.currentProgress = buffered / duration
        }
      } catch (e) {
      }
    }

    // 获取当前播放时间
    ele.ontimeupdate = () => {
      that.currentTime = ele.currentTime
    }

    // // 当前音乐播放完毕
    // ele.onended = () => {
    //   if (that.mode === playMode.loop){
    //     that.loop()
    //   }else {
    //     that.next
    //   }
    // }

    // // 音乐播放错误
    // ele.onerror = () => {
    //   if (retry === 0){
    //     let toastText = '当前音乐不可以播放，已自动播放下一曲'
    //     if (that.playlist.length === 1){
    //       toastText = '当前没有可播放的音乐'
    //     }
    //     that.next(true)
    //   }else {
    //     retry -= 1
    //     ele.url = that.currentMusic.url
    //     ele.load()
    //   }
    // }

    // 音乐进度拖动大于加载时重载音乐
    ele.onstalled = () => {
      ele.load()
      that.setPlaying(false)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.setPlaying(true)
      }, 10)
    }
    // // 将能播放的音乐加入播放历史
    // ele.oncanplay = () => {
    //   retry = 1
    //   if (
    //     that.historyList.length === 0 ||
    //     that.currentMusic.id !== that.historyList[0].id
    //   ) {
    //     that.setHistory(that.currentMusic)
    //   }
    // }
    // 音频数据不可用时
    ele.onstalled = () => {
      ele.load()
      that.setPlaying(false)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.setPlaying(true)
      }, 10)
    }
    // 当音频已暂停时
    ele.onpause = () => {
      that.setPlaying(false)
    }

  }
}


export default musicPlayer
