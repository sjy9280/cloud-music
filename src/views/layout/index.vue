<template>
  <div class="layout">
    <el-container>
      <el-header>
        <music-header></music-header>
      </el-header>
      <el-container>
        <el-aside width="200px"><music-aside></music-aside></el-aside>
        <el-main>Main</el-main>
      </el-container>
      <el-footer><music-footer></music-footer></el-footer>
    </el-container>
  </div>
</template>

<script>

import MusicHeader from '@/views/layout/component/Header'
import MusicAside from '@/views/layout/component/Aside'
import MusicFooter from '@/views/layout/component/Footer'
export default {
  name: 'Layout',
  components: { MusicFooter, MusicAside, MusicHeader }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #f9f9f9;
}

.el-aside {
  background-color: #ededed;
}

.el-footer {
  background-color: #f9f9f9;
}
</style>
