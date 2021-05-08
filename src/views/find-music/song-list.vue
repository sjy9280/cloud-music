<template>
  <div class="song-list">
    <div class="category-block">
      <div class="all-category">
        <el-popover
          placement="bottom-start"
          width="600"
          trigger="click">
          <el-button type="text">全部分类</el-button>
          <el-divider></el-divider>
          <category-layout v-for="item in categories" :key="item.category" :category="item.category"
                           :category-items="item.categoryItems"></category-layout>
          <el-button slot="reference" round>{{ category }}</el-button>
        </el-popover>
      </div>
      <div class="hot-category">
        <span v-for="item in hotCategories" :key="item.id">{{ item.name }}</span>
      </div>
    </div>
    <div class="song-list-result">
      <music-cover v-for="item in songListResult"
                   :key="item.id"
                   :img-url="item.coverImgUrl"
                   :shape="'square'"
                   :title="item.name"
                   :right-top-icon="true"
                   :counts="item.playCount"
                   :left-bottom-icon="true"
                   :user="item.creator.nickname"></music-cover>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="50"
      @current-change="handlePageChange" style="text-align: center">
    </el-pagination>
  </div>
</template>

<script>
import MusicCover from '@/components/music—cover'
import { getAllSongList, getSongListCategories, getSongListHotCategories } from '@/services/find-music'
import CategoryLayout from '@/views/find-music/component/category-layout'

export default {
  name: 'SongList',
  components: {
    CategoryLayout,
    MusicCover
  },
  data () {
    return {
      category: '全部分类',
      songListResult: [],
      offset: 0,
      total: 0,
      pageCount: 0,
      categories: [],
      hotCategories: []
    }
  },
  created () {
    this.getAllCategories()
    this.getHotCategories()
    this.getSongListResult()
  },
  methods: {
    async getSongListResult () {
      const { data } = await getAllSongList(
        {
          limit: 50,
          offset: this.offset
        }
      )
      if (data.code === 200) {
        this.songListResult = data.playlists
        this.total = data.total
        console.log(data)
      }
    },
    handlePageChange (page) {
      this.offset = (page - 1) * 50
      this.getSongListResult()
    },
    async getAllCategories () {
      const { data } = await getSongListCategories()
      console.log(data)
      if (data.code === 200) {
        for (const index in data.categories) {
          this.categories[index] = {}
          this.categories[index].category = data.categories[index]
          this.categories[index].categoryItems = []
        }

        for (const item of data.sub) {
          this.categories[item.category].categoryItems = [...this.categories[item.category].categoryItems, item]
        }
      }
      console.log(this.categories)
    },
    async getHotCategories () {
      const { data } = await getSongListHotCategories()
      if (data.code === 200) {
        this.hotCategories = data.tags
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  .category-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .hot-category{
      font-size: 14px;
      color: #303133;
      margin-right: 20px;
      span{
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
}

.song-list-result {
  display: flex;
  flex-wrap: wrap;
}
</style>
