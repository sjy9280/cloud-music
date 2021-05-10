<template>
  <div class="rank-list">
    <div class="official-rank">
      <b>官方榜</b>
      <div class="official-rank-content">
        <rank-list-item v-for="item in officialRankIds" :key="item" :id="item"
                        class="official-rank-content-item"></rank-list-item>
      </div>
    </div>
    <div class="global-rank">
      <b>全球榜</b>
      <div class="global-rank-content">
        <music-cover v-for="item in globalList" :key="item.id"
                     :shape="'square'" :right-top-icon="true"
                     :counts="item.playCount"
                     :title="item.name"
                     :img-url="item.coverImgUrl"
                     @click.native="handleSongDetail(item)"></music-cover>
      </div>
    </div>
  </div>
</template>

<script>
import RankListItem from '@/views/find-music/component/rank-list-item'
import { getRankList } from '@/services/find-music'
import MusicCover from '@/components/music-cover'

export default {
  name: 'RankList',
  components: {
    MusicCover,
    RankListItem
  },
  data () {
    return {
      officialRankIds: [],
      globalList: []
    }
  },
  created () {
    this.getRankList()
  },
  methods: {
    async getRankList () {
      const { data } = await getRankList()
      if (data.code === 200) {
        for (const item of data.list) {
          if ('ToplistType' in item) {
            this.officialRankIds.push(item.id)
          } else {
            this.globalList = [...this.globalList, item]
          }
        }
      }
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
.official-rank {
  margin-bottom: 50px;

  .official-rank-content {
    margin-top: 30px;

    .official-rank-content-item {
      margin-bottom: 60px;
    }
  }
}

.global-rank {

  .global-rank-content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
  }

}
</style>
