<template>
  <div class="music-cover">
    <div :class="'music-cover-'+shape">
      <div class="music-cover-pic" @mouseover="handleIconShow()"
           @mouseleave="handleIconHide()">
        <el-image :src="imgUrl" :class="'el-image-'+shape"></el-image>
        <i class="el-icon-video-play left-top-icon" v-show="leftTopIcon"></i>
        <span v-show="rightTopIcon" class="right-top-icon"><i class="el-icon-caret-right"></i>{{
            numFormat(counts)
          }}</span>
        <span v-show="leftBottomIcon" class="left-bottom-icon"><i class="el-icon-user"></i>&nbsp;{{ user }}</span>
        <i class="iconfont icon-ai04 right-bottom-icon" v-show="rightBottomIcon"></i>
      </div>
      <span style="font-size: 12px">{{ title }}</span>
      <span style="display: block;font-size: 12px;color: gray">{{ author }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicCover',
  props: {
    title: String,
    author: String,
    user: String,
    imgUrl: String,
    shape: {
      type: String,
      default: 'rectangle',
      validator (val) {
        return ['rectangle', 'square'].includes(val)
      }
    },
    leftTopIcon: {
      type: Boolean,
      default: false
    },
    rightTopIcon: {
      type: Boolean,
      default: false
    },
    leftBottomIcon: {
      type: Boolean,
      default: false
    },
    counts: Number
  },
  data () {
    return {
      rightBottomIcon: false
    }
  },
  methods: {
    handleIconShow () {
      this.rightBottomIcon = true
    },
    handleIconHide () {
      this.rightBottomIcon = false
    }
  },
  computed: {
    numFormat () {
      return function (num) {
        if (num > 100000) {
          return Math.floor(num / 100000) + '万'
        } else {
          return num + ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.el-image-rectangle {
  width: 270px;
  height: 140px;
  border-radius: 5px;
}

.el-image-square {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.music-cover-rectangle {
  width: 270px;
  padding: 8px;
  font-size: 14px;
}

.music-cover-square {
  width: 200px;
  padding: 12px;
  font-size: 14px;
}

.music-cover-pic {
  position: relative;
  cursor: pointer;

  .left-top-icon {
    position: absolute;
    top: 5px;
    left: 5px;
    color: white;
    font-size: 25px;
  }

  .right-top-icon {
    position: absolute;
    top: 10px;
    right: 5px;
    color: white;
    font-size: 12px;
  }

  .right-bottom-icon {
    color: $--color-primary;
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 50px;
  }

  .left-bottom-icon {
    color: white;
    position: absolute;
    left: 5px;
    bottom: 5px;
    font-size: 10px;
  }
}
</style>
