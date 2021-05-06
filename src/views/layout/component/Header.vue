<template>
  <div class="header">
    <div class="left"></div>
    <div class="right">
      <el-input placeholder="请输入内容" class="search-box">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="iconfont icon-yifu" :class="color" v-on:mouseover="color='theme_selected'" v-on:mouseleave="color='theme'"></i>
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
export default {
  name: 'MusicHeader',
  data () {
    return {
      color: 'theme'
    }
  },
  methods: {
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
