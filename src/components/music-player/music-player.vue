<template>
  <div class="music-player">
    <audio :src="playlist[currentIndex].url || ''" ref="audio"
           @canplay="startPlay"></audio>
    <div class="music-left-msg">
      <el-avatar shape="square" :size="40"
                 src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
      <div class="music-msg-right">
        <div class="music-name">
          <div>
            <span style="color: #303133">耳朵</span> -
            <span>李荣浩</span>
          </div>
          <span class="music-duration">00:00 / 04:01</span>
        </div>
        <el-slider v-model="progress" :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div class="music-player-control">
      <i class="iconfont icon-zhuifanshu" style="font-size: 20px;"></i>
      <i class="iconfont icon-ai10" style="font-size: 20px" @click="preMusic"></i>
      <i class="iconfont" style="font-size: 45px" @click="toggleMusic" :class="playState?'icon-ai06':'icon-ai04'"></i>
      <i class=" iconfont icon-ai09" style="font-size: 20px" @click="nextMusic"></i>
    </div>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MusicPlayer',
  data () {
    return {
      playState: false,
      progress: 50,
      volume: 50
    }
  },
  created () {
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.audio)
    })
  },
  methods: {
    // 播放器的开关
    toggleMusic () {
      this.playState = !this.playState
      if (this.playState) {
        this.audioEle.play()
      } else {
        this.audioEle.pause()
      }
    },
    // 上一首歌
    preMusic () {

    },

    // 下一首歌
    nextMusic () {
    },
    startPlay () {

    },
    ...mapMutations({
      setAudioEle: 'SET_AUDIOELE'
    })
  },
  computed: {
    ...mapGetters([
      'audioEle',
      'mode',
      'playing',
      'playlist',
      'orderList',
      'currentIndex',
      'currentMusic',
      'historyList'
    ])
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
