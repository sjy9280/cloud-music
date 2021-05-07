<template>
  <div class="header">
    <div class="left">
      <span v-for="item in headerMenu" :key="item.id" class="header-menu-item" @click="selectMenu(item)" :class="{active: isActive===item.id}">{{
          item.title
        }}</span>
    </div>
    <div class="right">
      <el-input placeholder="请输入内容" class="search-box">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="iconfont icon-yifu" :class="color" v-on:mouseover="color='theme_selected'"
             v-on:mouseleave="color='theme'"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="theme_option">
          <el-dropdown-item>白色</el-dropdown-item>
          <el-dropdown-item>红色</el-dropdown-item>
          <el-dropdown-item>黑色</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'MusicHeader',
  data () {
    return {
      color: 'theme',
      headerList: [
        [
          {
            id: 1,
            title: '个性推荐',
            name: 'recommend'
          },
          {
            id: 2,
            title: '歌单',
            name: 'songList'
          },
          {
            id: 3,
            title: '主播电台',
            name: 'newsRadio'
          },
          {
            id: 4,
            title: '排行榜',
            name: 'rankList'
          },
          {
            id: 5,
            title: '歌手',
            name: 'singer'
          },
          {
            id: 6,
            title: '最新音乐',
            name: 'newestSong'
          }
        ],
        [
          {
            id: 7,
            title: '视频',
            name: 'video'
          },
          {
            id: 8,
            title: 'MV',
            name: 'mv'
          }
        ]
      ],
      headerMenu: [],
      isActive: 1
    }
  },
  created () {
    this.initHeader()
  },
  methods: {
    initHeader () {
      if (store.state.block_selected === 0) {
        this.headerMenu = this.headerList[0]
      } else if (store.state.block_selected === 1) {
        this.headerMenu = this.headerList[1]
      } else {
        this.headerMenu = []
      }
    },
    selectMenu (item) {
      this.$router.push({ name: item.name })
      this.isActive = item.id
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    .header-menu-item {
      color: gray;
      margin: 0 10px;
      cursor: pointer;
    }

    .active {
      color: $--color-primary;
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;

    ::v-deep .el-input__inner {
      width: 200px;
      height: 30px;
      border-radius: 30px;
    }

    ::v-deep .el-input__icon {
      line-height: 30px;
    }

    .theme {
      color: gray;
      margin: 0 10px;
    }

    .theme_selected {
      color: $--color-primary;
      margin: 0 10px;
    }
  }

}

</style>
