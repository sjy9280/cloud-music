<template>
  <div class="recommend_layout">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in carousels" :key="'carousel-info'+item.targetId+item.typeTitle">
        <el-image :src="item.imageUrl" style="border-radius: 10px;transform: scale(0.8)" fit="cover"
                  @click="handleBanner(item)"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="exclusive-part">
      <block-title :title="'独家放送'"></block-title>
      <div class="content">
        <music-cover v-for="item in exclusiveMusics" :key="'cover-'+item.id" :title="item.name"
                     :img-url="item.sPicUrl" :left-top-icon="true"></music-cover>
      </div>
    </div>
    <div class="recommend-music-part">
      <block-title :title="'推荐歌单'"></block-title>
      <div class="content">
        <music-cover v-for="item in recommendSongsList" :key="'recommend-song-info'+item.id" :title="item.name"
                     :img-url="item.picUrl" :counts="item.playCount" :right-top-icon="true"
                     :shape="'square'" @click.native="handleSongDetail(item)"></music-cover>
      </div>
    </div>
    <div class="newest-music-part">
    </div>
    <div class="recommend-mv-part">
      <block-title :title="'推荐MV'"></block-title>
      <div class="content">
        <music-cover v-for="item in recommendMv" :key="'recommend-mv-info'+item.id" :title="item.name"
                     :author="item.artists[0].name"
                     :img-url="item.picUrl" :counts="item.playCount" :right-top-icon="true"></music-cover>
      </div>
    </div>
    <div class="news-radio-part"></div>
  </div>
</template>

<script>
import { getBannerPics, getExclusiveMusic, getRecommendMV, getRecommendSongsList } from '@/services/find-music'
import BlockTitle from '@/components/block-title'
import MusicCover from '@/components/music-cover'

export default {
  name: 'MusicRecommend',
  components: {
    MusicCover,
    BlockTitle
  },
  data () {
    return {
      carousels: [],
      exclusiveMusics: [],
      recommendSongsList: [],
      recommendMv: []
    }
  },
  created () {
    this.getCarouselPic()
    this.getExclusiveMusic()
    this.getRecommendSongsList()
    this.getRecommendMV()
  },
  methods: {
    async getCarouselPic () {
      const { data } = await getBannerPics()
      console.log(data)
      if (data.code === 200) {
        this.carousels = data.banners
      }
    },
    async getExclusiveMusic () {
      const { data } = await getExclusiveMusic()
      if (data.code === 200) {
        this.exclusiveMusics = data.result
      }
    },
    async getRecommendSongsList () {
      const { data } = await getRecommendSongsList()
      if (data.code === 200) {
        this.recommendSongsList = data.result.slice(0, 10)
      }
    },
    async getRecommendMV () {
      const { data } = await getRecommendMV()
      if (data.code === 200) {
        this.recommendMv = data.result
      }
    },
    async handleBanner () {

    },
    handleSongDetail (item) {
      this.$router.push({
        path: `/playlist/detail/${item.id}/songs`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>
