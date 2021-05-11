<template>
  <div class="songs-layout">
    <el-table
      :data="songsList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
      width="100">
        <template>
          <span><i class="iconfont icon-zhuifanshu" style="font-size: 16px"></i></span>
          &nbsp;&nbsp;&nbsp;
          <span><i class="el-icon-download" style="font-size: 16px"></i></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题">
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手">
      </el-table-column>
      <el-table-column
        prop="al.name"
        label="专辑">
      </el-table-column>
      <el-table-column
        label="时长">
        <template slot-scope="scope">
          {{ scope.row.dt | timeFormat }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPlayListDetail } from '@/services/find-music'
import { getCollectedSongs } from '@/services/song-list'
import { formatDate } from '@/utils/date'

export default {
  name: 'SongsLayout',
  data () {
    return {
      songsList: [],
      trackIds: []
    }
  },
  created () {
    this.getPlayListDetail()
  },
  methods: {
    async getPlayListDetail () {
      const { data } = await getPlayListDetail({
        id: this.$route.params.id
      })
      if (data.code === 200) {
        this.trackIds = data.playlist.trackIds.map((item) => item.id)
        const data1 = await getCollectedSongs({
          ids: this.trackIds.join(',')
        })
        if (data1.data.code === 200) {
          this.songsList = data1.data.songs
        }
      }
    }
  },
  filters: {
    timeFormat (data) {
      return formatDate(new Date(data), 'mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
