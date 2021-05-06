<template>
  <div class="footer">
    <div class="music-player">
      <div class="music-left-msg">
        <el-avatar shape="square" :size="40"
                   src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        <div class="music-msg-right">
          <div>
            <span class="music-name">耳朵</span> -
            <span>李荣浩</span>
            <span class="music-duration">00:00 / 04:01</span>
          </div>
          <el-progress :percentage="50" :show-text="false" style="margin-top: 5px"></el-progress>
        </div>
      </div>
      <div class="music-player-control">
        <i class="iconfont icon-zhuifanshu" style="font-size: 20px;"></i>
        <i class="iconfont icon-ai10" style="font-size: 20px"></i>
        <i class="iconfont icon-ai04" style="font-size: 45px"></i>
        <i class="iconfont icon-ai09" style="font-size: 20px"></i>
      </div>
      <div class="music-setting">
        <i class="iconfont icon-xunhuanbofang" style="font-size: 20px"></i>
        <i class="iconfont icon-guanlishipin" style="font-size: 20px"></i>
        <i class="iconfont icon-yangshengqi" style="font-size: 20px"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  height: 100%;

  .music-player {
    height: 100%;
    display: flex;
    align-items: center;

    .music-left-msg {
      font-size: 12px;
      color: gray;
      display: flex;
      flex: 1;
      justify-content: flex-start;

      .music-msg-right {
        width: 400px;
        margin-left: 10px;

        .music-name {
          font-size: 14px;
          color: #303133;
        }
        .music-duration{
          float: right;
        }
      }
    }

    .music-player-control {
      height: 100%;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      color: $--color-primary;
      i{
        margin: 0 10px;
      }
    }

    .music-setting {
      height: 100%;
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      i{
        margin: 0 10px;
        color: gray;
      }
    }
  }
}
</style>
