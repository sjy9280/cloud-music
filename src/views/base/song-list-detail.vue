<template>
  <div class="list-detail">
    <div class="detail-header">
      <el-image :src="headerImg"
                class="detail-cover"></el-image>
      <el-button round @click="playAllSongs">播放全部</el-button>
    </div>
    <div class="detail-main">
      <el-menu :default-active="prefix+'/songs'" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item :index="prefix+'/songs'">歌曲列表</el-menu-item>
        <el-menu-item :index="prefix+'/comments'">评论({{ commentCounts }})</el-menu-item>
        <el-menu-item :index="prefix+'/collectors'">收藏者</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getPlayListDetail } from '@/services/find-music'
import { mapActions, mapMutations } from 'vuex'
import { getSong } from '@/services/player'

export default {
  name: 'SongListDetail',
  data () {
    return {
      headerImg: '',
      tags: [],
      creator: {},
      activeIndex: 1,
      prefix: '',
      commentCounts: 0,
      trackIds: []
    }
  },
  created () {
    this.prefix = '/playlist/detail/' + this.$route.params.id
    this.getPlayListDetail()
  },
  methods: {
    async getPlayListDetail () {
      const { data } = await getPlayListDetail({
        id: this.$route.params.id
      })
      if (data.code === 200) {
        this.headerImg = data.playlist.coverImgUrl
        this.commentCounts = data.playlist.commentCount
        this.trackIds = data.playlist.trackIds.map((item) => item.id)
      }
    },
    ...mapActions(['selectPlay']),
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    async playAllSongs () {
      console.log('添加歌单')
      const { data } = await getSong({
        id: this.trackIds.join(',')
      })
      console.log(data)
      if (data.code === 200) {
        this.selectPlay({
          list: data.data,
          index: 0
        })
        this.setCurrentIndex = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-detail {
  .detail-header {
    .detail-cover {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }
  }
}
</style>
