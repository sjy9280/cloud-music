<template>
  <div class="list-detail">
    <div class="detail-header">
      <el-image :src="headerImg"
                class="detail-cover"></el-image>
      <div class="detail-header-right">
        <div class="title">
          <div style="display: inline"><span class="plain-border">歌单</span></div>
          <h2>{{ title }}</h2>
        </div>
        <div class="creator">
          <el-avatar :src="creator.avatarUrl" :size="30"></el-avatar>
          <el-button type="text" style="color: #589df6;margin: 0 10px">{{ creator.nickname }}</el-button>
          <span style="color: #666666;font-size: 14px">{{ createTime| dateFormat }}创建</span>
        </div>
        <div class="option-btn">
          <el-button-group>
            <el-button round type="primary" @click="playAllSongs"><i class="el-icon-video-play"></i>播放全部</el-button>
            <el-button round type="primary" icon="el-icon-plus"></el-button>
          </el-button-group>
          <el-button round><i class="el-icon-folder-add"></i>收藏</el-button>
          <el-button round><i class="el-icon-share"></i>分享</el-button>
          <el-button round><i class="el-icon-download"></i>下载全部</el-button>
        </div>
        <div class="song-list-brief">
          <div>
            <span class="small-title">标签</span>：
            <span v-for="(item,index) in tags" :key="item">
              <a type="text" style="color: #589df6">{{ item }}
              </a><span v-if="index!=tags.length-1">/</span>
            </span>
          </div>
          <div>
            <span class="small-title">歌曲数</span>：
            <span>{{ songsCount }}</span>
            <span class="small-title" style="margin-left: 10px">播放数</span>：
            <span>{{ playCount }}</span>
          </div>
          <div>
            <div class="brief-description">
              <span class="small-title">简介</span>：
              <span v-if="!moreState">{{ description|ellipsis }}</span>
              <span v-if="moreState">{{ description }}</span></div>
            <div class="show-more">
              <i :class="moreState?'el-icon-caret-top':'el-icon-caret-bottom'" @click="showMore"></i>
            </div>
          </div>
        </div>
      </div>
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
import { formatDate } from '@/utils/date'

export default {
  name: 'SongListDetail',
  data () {
    return {
      headerImg: '',
      title: '',
      description: '',
      tags: [],
      songsCount: '',
      playCount: '',
      songsList: [],
      creator: {},
      activeIndex: 1,
      prefix: '',
      createTime: '',
      commentCounts: 0,
      trackIds: [],
      moreState: false
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
        this.title = data.playlist.name
        this.description = data.playlist.description
        this.commentCounts = data.playlist.commentCount
        this.creator = data.playlist.creator
        this.createTime = data.playlist.createTime
        this.tags = data.playlist.tags
        this.songsCount = data.playlist.trackCount
        this.playCount = data.playlist.playCount
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
    },
    showMore () {
      this.moreState = !this.moreState
    }
  },
  filters: {
    dateFormat (date) {
      return '20' + formatDate(new Date(date), 'yy-MM-dd')
    },
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 40) {
        return value.slice(0, 40) + '...'
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.list-detail {
  .detail-header {
    display: flex;

    .detail-cover {
      width: 200px;
      height: 200px;
      border-radius: 5px;
      flex-shrink: 0;
    }

    .detail-header-right {
      margin-left: 20px;

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .plain-border {
          padding: 0 5px;
          height: 26px;
          line-height: 26px;
          border: 1px $--color-primary solid;
          border-radius: 5px;
          color: $--color-primary;
          display: inline-block;
          margin: 0 2px;
        }

        h2 {
          display: inline-block;
          margin-block-start: 0;
          margin-block-end: 0;
          padding: 1px 5px;
        }
      }

      .creator {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .option-btn {
        margin-bottom: 10px;

        .el-button-group {
          margin-right: 10px;
        }
      }

      .song-list-brief {
        color: #666666;
        font-size: 14px;

        .small-title {
          color: #3b3b3b;
          width: 55px;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
        }
      }

      .brief-description {
        display: inline-block;
        width: 610px;
        position: relative;
      }

      .show-more {
        display: inline-block;
        position: absolute;
      }
    }
  }
}
</style>
