<template>
  <div class="music-player">
    <!--歌曲信息-->
    <div class="music-left-msg">
      <div class="play-cover" @mouseenter="isShade=true" @mouseleave="isShade=false" @click="togglePlayerPure">
        <el-avatar shape="square" :size="40" :src="currentMusic.pic"></el-avatar>
        <i class="iconfont icon-zhankaiquanpingkuozhan cover-kuozhan" v-show="isShade"></i>
      </div>
      <div class="music-msg-right">
        <div class="music-name">
          <div>
            <span style="color: #303133">{{ currentMusic.name }}&nbsp;-&nbsp;</span>
            <span>{{ currentMusic.artist[0].name }}</span>
          </div>
          <span class="music-duration">{{
              currentTime | format
            }} / {{ currentMusic.duration|timeFormat }}</span>
        </div>
        <el-slider v-model="musicProgress" :show-tooltip="false" :step="0.01" @change="dragProgress"></el-slider>
      </div>
    </div>

    <!--播放器按钮-->
    <div class="music-player-control">
      <i class="iconfont icon-zhuifanshu" style="font-size: 20px;"></i>
      <i class="iconfont icon-ai10" style="font-size: 20px" @click="preMusic"></i>
      <i class="iconfont" style="font-size: 45px" @click="toggleMusic" :class="playing?'icon-ai06':'icon-ai04'"></i>
      <i class=" iconfont icon-ai09" style="font-size: 20px" @click="nextMusic"></i>
    </div>

    <!--音乐播放设置-->
    <div class="music-setting">
      <i class="iconfont icon-xunhuanbofang" style="font-size: 20px"></i>
      <el-popover
        placement="top"
        width="350"
        trigger="click">
        <div style="height: 80vh"></div>
        <el-button type="text" slot="reference"><i class="iconfont icon-guanlishipin" style="font-size: 20px"></i>
        </el-button>
      </el-popover>

      <el-popover
        placement="top-end"
        width="40"
        trigger="click">
        <el-slider
          v-model="volume"
          vertical
          height="200px">
        </el-slider>
        <el-button type="text" slot="reference">
          <i class="iconfont"
             :class="volume===0?'icon-jingyin':'icon-yangshengqi'"
             style="font-size: 20px"></i>
        </el-button>
      </el-popover>
    </div>

    <!--歌词页面-->
    <transition name="lyrics" enter-active-class="animate__animated animate__fadeInUpBig"
                leave-active-class="animate__animated animate__fadeOutDownBig">
      <lyrics-layout v-show="isLyrics" :current-music="currentMusic"></lyrics-layout>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { format, silencePromise } from '@/utils/util'
import { formatDate } from '@/utils/date'
import musicPlayer from '@/components/music-player/player'
import LyricsLayout from '@/components/music-player/lyrics'

export default {
  name: 'MusicPlayer',
  components: { LyricsLayout },
  data () {
    return {
      playState: false,
      volume: 50,
      currentProgress: 0,
      lyric: [],
      lyricIndex: 0,
      isMute: false, // 是否静音
      currentTime: 0,
      flag: false,
      musicProgress: 0,
      isLyrics: false, // 是否展开歌词
      isShade: false,
      oldSelectBlock: 2
    }
  },
  created () {
    this.audioEle.src = this.currentMusic.src
  },
  mounted () {
    this.$nextTick(() => {
      musicPlayer.initAudio(this)
    })
  },
  methods: {
    // 播放器的开关
    toggleMusic () {
      if (!this.flag) {
        this.audioEle.autoplay = 'autoplay'
        this.flag = true
      }
      this.setPlaying(!this.playing)
    },
    // 上一首歌
    preMusic () {
      let index = this.currentIndex
      if (this.currentIndex - 1 < 0) {
        index = this.playlist.length + (this.currentIndex - 1)
      } else {
        index = this.currentIndex - 1
      }
      this.setCurrentIndex({ index: index })
    },

    // 下一首歌
    nextMusic () {
      let index = this.currentIndex
      if (this.currentIndex + 1 > this.playlist.length - 1) {
        index = 0
      } else {
        index = this.currentIndex + 1
      }
      this.setCurrentIndex({ index: index })
    },
    loop () {
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
    },
    dragProgress () {
      this.audioEle.currentTime = this.currentMusic.duration * this.musicProgress / 100000
    },
    togglePlayerPure () {
      this.isLyrics = !this.isLyrics
      if (this.isLyrics) {
        this.oldSelectBlock = this.selectBlock
        this.setSelectBlock({ index: 2 })
      } else {
        if (this.oldSelectBlock !== 2) {
          this.setSelectBlock({ index: this.oldSelectBlock })
        }
      }
    },
    ...mapActions([
      'setCurrentIndex',
      'setPlaylist',
      'setSelectBlock'
    ]),
    ...mapMutations({
      setPlaying: 'SET_PLAYING'
    })
  },
  computed: {
    ...mapGetters([
      'audioEle',
      'playing',
      'playlist',
      'currentIndex',
      'currentMusic',
      'selectBlock'
    ])
  },
  filters: {
    timeFormat (time) {
      return formatDate(new Date(time), 'mm:ss')
    },
    format
  },
  watch: {
    currentMusic (newMusic, oldMusic) {
      this.audioEle.src = this.playlist[this.currentIndex].src
      this.currentTime = this.currentProgress = 0
    },
    playing (newPlaying) {
      const audio = this.audioEle
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause()
      })
    },
    currentTime (newTime) {
      this.musicProgress = Math.floor(this.currentTime * 1000 / this.currentMusic.duration * 100)
    }
  }
}
</script>

<style lang="scss" scoped>

.music-player {
  height: 100%;
  display: flex;
  align-items: center;

  .music-left-msg {
    font-size: 12px;
    color: gray;
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;

    .play-cover {
      position: relative;
      cursor: pointer;

      .cover-kuozhan {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
        font-size: 20px;
      }
    }

    .music-msg-right {
      width: 400px;
      margin-left: 10px;

      .music-name {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3px;
      }
    }

    ::v-deep .el-slider__runway {
      margin: 4px 0;
    }
  }

  .music-player-control {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: $--color-primary;

    i {
      margin: 0 10px;
      cursor: pointer;
    }
  }

  .music-setting {
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;

    i {
      margin: 0 10px;
      color: gray;
    }

    ::v-deep .el-popover {
      min-width: 40px;
    }
  }

}
</style>
