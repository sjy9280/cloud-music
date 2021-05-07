<template>
  <div class="block-title">
    <span>{{ title }}</span>
    <i class="el-icon-arrow-right"></i>
  </div>
</template>

<script>
export default {
  name: 'BlockTitle',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.block-title{
  color: #303133;
  font-size: 17px;
  margin: 10px 0;
}
</style>
