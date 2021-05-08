<template>
  <div class="category-layout">
    <div class="category-title">
      <span>
        {{ category }}
      </span>
    </div>
    <div class="category-content">
      <div v-for="item in categoryItems" :key="item.name" class="category-item">
        <el-badge value="hot" class="item" :hidden="!item.hot">
          <span style="padding-right: 4px">{{ item.name }}</span>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryLayout',
  props: {
    category: String,
    categoryItems: Array
  }
}
</script>

<style lang="scss" scoped>
.category-layout {
  display: flex;

  .category-title {
    flex: 1;
  }

  .category-content {
    display: flex;
    flex-wrap: wrap;
    flex: 5;

    .category-item {
      position: relative;
      width: 72px;
      height: 35px;
      font-size: 12px;
      background-color: white;
      color: #303133;
      margin: 0 5px;
      cursor: pointer;
    }

    .category-hot {
      //transform: scale(0.5);
    }
  }
}
</style>
