<template>
  <div class="comment-layout">
    <div class="avatar">
      <el-avatar :size="40" :src="comment.user.avatarUrl"></el-avatar>
    </div>
    <div class="comment-content">
      <span class="nickname">{{ comment.user.nickname }}：</span>
      <span>{{ comment.content }}</span>
      <div v-if="comment.beReplied.length !== 0" class="comment-replied">
        <span class="nickname">{{ comment.beReplied[0].user.nickname }}：</span>
        {{ comment.beReplied[0].content }}
      </div>
      <div class="comment-event">
        <p style="color: gray">{{ comment.time| format }}</p>
        <div class="comment-options">
          <i class="iconfont icon-dianzan">&nbsp;<span style="font-size: 14px">{{ comment.likedCount === 0 ? '' : comment.likedCount }}</span></i>
          <i class="iconfont icon-fenxiang"></i>
          <i class="iconfont icon-pinglun"></i>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'

export default {
  name: 'CommentLayout',
  props: {
    comment: Object
  },
  filters: {
    format (time) {
      return '20' + formatDate(new Date(time), 'yy年MM月dd日 mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-layout {
  display: flex;
  justify-content: left;

  .avatar {
    min-width: 60px;
    flex-shrink: 0;
  }

  .comment-content {
    flex: 1;

    .nickname {
      color: #557ead;
    }

    el-divider {
      width: 100%;
    }

    .comment-replied {
      background-color: #f1f0f1;
      padding: 10px;
      border-radius: 3px;
      margin: 5px 0;
    }

    .comment-event {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .comment-options {
        i {
          font-size: 20px;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
