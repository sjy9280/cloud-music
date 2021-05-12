<template>
  <div class="lyrics-layout">
    <div class="lyrics-up-block">
      <div class="cd">
        <div class="player-point">
          <img src="@/assets/img/play-bar-support.png">
        </div>
        <div class="player-stick" :style="barStyle">
          <img src="@/assets/img/play-bar.png">
        </div>
        <div class="player-pure-pic" :class="this.playing?'lyric-anim-running':'lyric-anim-stop'">
          <img :src="currentMusic.pic" alt=""/>
        </div>
      </div>
      <div class="music-msg">
        <span class="music-name">{{ currentMusic.name }}</span>
        <lyric-player :lyric="lyric" class="music-lyric"></lyric-player>
      </div>
    </div>
    <div class="lyrics-down-block">
      <div class="comments">
        <ul>
          <li v-for="item in comments" :key="item.commentId">
            {{ item.content }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getLyric, getSongComments } from '@/services/player'
import LyricPlayer from '@/components/music-player/lyric-player'
import { mapGetters } from 'vuex'

export default {
  name: 'LyricsLayout',
  components: { LyricPlayer },
  props: {
    currentMusic: Object
  },
  data () {
    return {
      lyric: '',
      comments: []
    }
  },
  created () {
    this.getLyrics()
    this.getComments()
  },
  methods: {
    async getLyrics () {
      const { data } = await getLyric({ id: this.currentMusic.id })
      if (data.code === 200) {
        if ('nolyric' in data) {
          console.log(data)
          this.lyric = '暂无歌词'
        } else {
          this.lyric = data.lrc.lyric || '暂无歌词'
        }
      }
    },
    async getComments () {
      const { data } = await getSongComments({
        id: this.currentMusic.id
      })
      if (data.code === 200) {
        this.comments = data.comments
      }
    }
  },
  computed: {
    ...mapGetters([
      'playing'
    ]),
    barStyle () {
      return {
        transform: this.playing ? 'rotate(-7deg)' : 'rotate(-45deg)'
      }
    }
  },
  watch: {
    id (newId) {
      console.log(newId)
      this.getLyrics()
    }
  }
}
</script>

<style lang="scss" scoped>
.lyrics-layout {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 60px;
  width: 100%;
  z-index: 500;
  overflow: auto;
  background-color: #f9f9f9;

  .lyrics-up-block {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: left;

    .cd {
      position: relative;
      width: 50%;

      .player-point {
        position: absolute;
        width: 25px;
        height: 25px;
        left: 60%;
        top: 0;
        margin-left: -35px;
        z-index: 2;

        img {
          width: 100%;
        }
      }

      .player-stick {
        position: absolute;
        width: 80px;
        transform-origin: 0 0;
        transform: rotate(-7deg);
        transition: transform 0.3s;
        left: 60%;
        top: 12.5px;
        margin-left: -27.5px;
        z-index: 1;

        img {
          width: 100%;
        }
      }

      .player-pure-pic {
        width: 240px;
        height: 240px;
        border: 50px solid #0e0e11;
        border-radius: 50%;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 60px;
        margin: auto;
        animation: rotate 20s linear infinite;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }

      .lyric-anim-stop {
        animation-play-state: paused;
      }

      .lyric-anim-running {
        animation-play-state: running;
      }

    }

    .music-msg {
      width: 50%;

      .music-name {
        margin-left: 40px;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .music-lyric {
        height: 400px;
        overflow: auto;
      }
    }
  }

  .lyrics-down-block {
    width: 80%;
    margin: 0 auto;
  }
}

</style>
