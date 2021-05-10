<template>
  <div>
    <div class="rank-list-item">
      <div class="rank-list-img" @mouseover="handleIconShow" @mouseleave="handleIconHide" @click="handleSongDetail()">
        <el-image :src="imgUrl" class="item-img"></el-image>
        <span class="update-time">{{ updateTime | format }}更新</span>
        <i class="iconfont icon-ai04 center-icon" v-show="centerIcon"></i>
      </div>
      <el-table
        :data="musicList"
        style="width: 100%;margin-left: 40px"
        :show-header="false">
        <el-table-column
          type="index"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name">
        </el-table-column>
        <el-table-column
          prop="ar[0].name">
        </el-table-column>
      </el-table>
    </div>
    <el-button type="text" style="margin-left: 280px" @click="handleSongDetail()">查看更多>></el-button>
  </div>

</template>

<script>
import { getPlayListDetail } from '@/services/find-music'

export default {
  name: 'RankListItem',
  props: {
    id: [Number, String]
  },
  data () {
    return {
      imgUrl: '',
      musicList: [],
      updateTime: '',
      centerIcon: false
    }
  },
  created () {
    this.getRankListDetail()
  },
  methods: {
    async getRankListDetail () {
      const { data } = await getPlayListDetail({
        id: this.id
      })
      if (data.code === 200) {
        this.imgUrl = data.playlist.coverImgUrl
        this.updateTime = data.playlist.updateTime
        this.musicList = data.playlist.tracks.splice(0, 5)
      }
    },
    handleIconShow () {
      this.centerIcon = true
    },
    handleIconHide () {
      this.centerIcon = false
    },
    handleSongDetail () {
      this.$router.push({
        path: `/playlist/detail/${this.id}/songs`
      })
    }
  },
  filters: {
    format (data) {
      const time = new Date(data)
      const m = time.getMonth() + 1
      const d = time.getDate()
      return m + '月' + d + '日'
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-list-item {
  display: flex;
  justify-content: space-between;

  .rank-list-img {
    position: relative;
    cursor: pointer;

    .item-img {
      width: 240px;
      height: 240px;
      border-radius: 10px;
    }

    .update-time {
      position: absolute;
      font-size: 20px;
      left: 70px;
      bottom: 50px;
      font-weight: bold;
      color: white;
    }

    .center-icon {
      color: $--color-primary;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -40px;
      margin-top: -40px;
      font-size: 80px;
    }
  }

}
</style>
