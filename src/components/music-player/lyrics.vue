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
      <span style="font-size: 18px;font-weight: bold">听友评论&nbsp;&nbsp;</span>
      <span style="color: #303133">&nbsp;&nbsp;(已有{{ commentCount }}条评论)</span>
      <el-input
        class="edit-comment"
        type="text"
        prefix-icon="el-icon-edit"
        placeholder="发表评论"
        v-model="commentContent">
      </el-input>

      <!--      <div class="hot-comments">-->
      <!--        <ul>-->
      <!--          <li v-for="item in hotComments" :key="item.commentId">-->
      <!--            <comment-layout :comment="item"></comment-layout>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->

      <div class="comments">
        <ul>
          <li v-for="item in comments" :key="item.commentId">
            <comment-layout :comment="item"></comment-layout>
          </li>
        </ul>
      </div>
    </div>
    <i class="iconfont icon-quxiaoquanping icon-exit" @click="exitLyrics"></i>
  </div>
</template>

<script>
import { getLyric, getSongComments } from '@/services/player'
import LyricPlayer from '@/components/music-player/lyric-player'
import { mapGetters } from 'vuex'
import CommentLayout from '@/components/comment-layout'

export default {
  name: 'LyricsLayout',
  components: {
    CommentLayout,
    LyricPlayer
  },
  props: {
    currentMusic: Object
  },
  data () {
    return {
      lyric: '',
      comments: [],
      commentContent: '',
      commentCount: 0,
      hotComments: []
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
        this.commentCount = data.total
        this.hotComments = data.hotComments
      }
    },
    exitLyrics () {
      this.$parent.isLyrics = false
    }
  },
  computed: {
    ...mapGetters([
      'playing',
      'audioEle'
    ]),
    barStyle () {
      return {
        transform: this.playing ? 'rotate(-7deg)' : 'rotate(-45deg)'
      }
    }
  },
  watch: {
    currentMusic (newMusic) {
      this.getLyrics()
      this.getComments()
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

  .icon-exit {
    position: absolute;
    right: 5%;
    top: 0;
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }

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
        left: 50%;
        top: 0;
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
        left: 50%;
        top: 12.5px;
        margin-left: 10px;
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
        left: 0;
        right: 0;
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
    margin: 20px auto;

    .edit-comment {
      width: 100%;
      margin-top: 3%;
      margin-bottom: 3%;
    }
  }

  ul, li {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 10px 0;
  }
}

</style>
