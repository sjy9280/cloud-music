<template>
  <div class="lyric-player" ref="scroll">
    <ul>
      <li v-for="(line, index) in lyricArr" :key="index"><span :class="{'active':index===lyricIndex}">{{
          line[1]
        }}</span></li>
    </ul>
  </div>
</template>

<script>
import { parseLyric } from '@/utils/parse-lyric'
import { mapGetters } from 'vuex'

export default {
  name: 'lyric-player',
  props: {
    lyric: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      lyricArr: [], // 转换后的歌词数组
      lyricIndex: -1 // 活跃的歌词行数
    }
  },
  computed: {
    ...mapGetters([
      'currentTime'
    ])
  },
  watch: {
    lyric (newLyrics) {
      this.lyricIndex = -1
      this.lyricArr = parseLyric(this.lyric)
      this.$refs.scroll.scrollTop = 0
      // this.$nextTick(() => {
      //   this.$refs.scroll.scrollTo(0, 0)
      // })
    },
    currentTime (newCurrentTime) {
      for (let i = 0; i < this.lyricArr.length; i++) {
        const line = this.lyricArr[i]
        const nextLine = this.lyricArr[i + 1]
        /** 如果歌曲currentTime大于当前行歌曲时间，并且，下一行不为空或者当前currentTime小于下一行时间 */
        if (
          this.currentTime >= line[0] &&
          (!nextLine || this.currentTime < nextLine[0])
        ) {
          this.lyricIndex = i
          if (this.lyricIndex > 6 && this.lyricIndex < this.lyricArr.length - 6) {
            this.$refs.scroll.scrollTop = 30 * (this.lyricIndex - 6)
          }
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
ul, li {
  list-style: none;
  font-size: 14px;
}

li {
  margin: 10px 0;
}

.active {
  color: #557ead;
  font-size: 16px;
}
</style>
