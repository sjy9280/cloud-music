<template>
  <div class="news-radio">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in banner" :key="'dj-'+item.targetId">
        <el-image :src="item.pic" style="border-radius: 10px;transform: scale(0.8)" fit="cover"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getDjBanner } from '@/services/find-music'

export default {
  name: 'NewsRadio',
  data () {
    return {
      banner: []
    }
  },
  created () {
    this.getDjBanner()
  },
  methods: {
    async getDjBanner () {
      const { data } = await getDjBanner()
      if (data.code === 200) {
        this.banner = data.data
      }
    }
  }
}
</script>

<style scoped>

</style>
