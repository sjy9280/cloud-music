<template>
  <div class="aside">
    <div class="login_item">
      <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <span class="login_username">未登录</span>
      <i class="el-icon-caret-right"></i>
    </div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      router
      @select="handleSelect">
      <el-menu-item index="/">
        <i class="iconfont icon-yinle icon-size"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/private-fm">
        <i class="iconfont icon-yijianting icon-size"></i>
        <span slot="title">私人FM</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <i class="iconfont icon-shipinneirong icon-size"></i>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/friends">
        <i class="iconfont icon-zhuanjiaku_tuandui icon-size"></i>
        <span slot="title">朋友</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <span>创建的歌单</span>
          <i class="el-icon-plus" style="margin-left: 20px"></i>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">我喜欢的音乐</el-menu-item>
          <el-menu-item index="5-2">我喜欢的音乐</el-menu-item>
          <el-menu-item index="5-3">我喜欢的音乐</el-menu-item>
          <el-menu-item index="5-4">我喜欢的音乐</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <span>收藏的歌单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1">我喜欢的音乐</el-menu-item>
          <el-menu-item index="6-2">我喜欢的音乐</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MusicAside',
  methods: {
    handleSelect (key, keyPath) {
      if (key === '/') {
        this.setSelectBlock({ index: 0 })
      } else if (key === '/video') {
        this.setSelectBlock({ index: 1 })
      } else {
        this.setSelectBlock({ index: 2 })
      }
    },
    ...mapActions([
      'setSelectBlock'
    ])
  }
}
</script>

<style lang="scss" scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.el-menu {
  background-color: #ededed;
  border: 0;

  .icon-size {
    font-size: 20px;
    margin-right: 10px;
  }
}

.login_item {
  padding: 10px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;

  .login_username {
    margin: 0 10px;
  }
}

.el-submenu, .el-menu-item, .el-menu-item-group {
  background-color: #ededed;
}

::v-deep .el-menu-item-group__title {
  display: none;
}

::v-deep .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
