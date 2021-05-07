<template>
  <div class="layout">
    <el-container class="frame">
      <el-container>
        <el-aside width="200px">
          <music-aside></music-aside>
        </el-aside>
        <el-container>
          <el-header>
            <music-header></music-header>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <music-footer></music-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import MusicHeader from '@/views/layout/component/Header'
import MusicAside from '@/views/layout/component/Aside'
import MusicFooter from '@/views/layout/component/Footer'

export default {
  name: 'Layout',
  components: {
    MusicFooter,
    MusicAside,
    MusicHeader
  }
}
</script>

<style lang="scss" scoped>
.frame {
  height: 100vh;
}

.el-header {
  background-color: #f9f9f9;
  position: relative;
  width: 100%;
  height: 60px;
  padding-left: 200px;
}

.el-aside {
  background-color: #ededed;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 60px;
  z-index: 100;
}

.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 60px;
  overflow-y: scroll;
}

.el-footer {
  background-color: #f9f9f9;
}

</style>
