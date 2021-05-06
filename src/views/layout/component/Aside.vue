<template>
  <div class="aside">
    <div class="login_item">
      <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <span class="login_username">未登录</span>
      <i class="el-icon-caret-right"></i>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <i class="iconfont icon-yinle icon-size"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="iconfont icon-yijianting icon-size"></i>
        <span slot="title">私人FM</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="iconfont icon-shipinneirong icon-size"></i>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="iconfont icon-zhuanjiaku_tuandui icon-size"></i>
        <span slot="title">朋友</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MusicAside'
}
</script>

<style lang="scss" scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.el-menu{
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
    margin:0 10px;
  }
}
</style>
