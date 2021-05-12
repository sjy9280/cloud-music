<template>
  <div class="lyric-player">
    <ul>
      <li v-for="item in lyricArr" :key="item[0]"><span>{{ item[1] }}</span></li>
    </ul>
  </div>
</template>

<script>
import { parseLyric } from '@/utils/parse-lyric'

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
      lyricArr: []
    }
  },
  watch: {
    lyric () {
      this.lyricArr = parseLyric(this.lyric)
      console.log(this.lyricArr)
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
</style>
