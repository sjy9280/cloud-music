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
import { getCollectedSongs } from '@/services/song-list'
import { getSong } from '@/services/player'
import { Song } from '@/components/music-player/init-song'

export default {
  name: 'SongListDetail',
  data () {
    return {
      headerImg: '',
      tags: [],
      songsList: [],
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
        const data1 = await getCollectedSongs({
          ids: this.trackIds.join(',')
        })
        if (data1.data.code === 200) {
          this.songsList = data1.data.songs
        }
      }
    },
    ...mapActions(['selectPlay', 'setPlaylist', 'setCurrentIndex']),
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST'
    }),
    async playAllSongs () {
      const playList = []
      for (let i = 0; i < this.songsList.length; i++) {
        getSong({ id: this.songsList[i].id }).then(res => {
          if (res.data.code === 200) {
            const song = new Song(this.songsList[i], res.data.data[0].url, this.songsList[i].id)
            playList.push(song)
            if (i === this.songsList.length - 1) {
              this.selectPlay({
                list: playList,
                index: 0
              })
              this.setCurrentIndex({ index: 0 })
            }
          }
        })
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
