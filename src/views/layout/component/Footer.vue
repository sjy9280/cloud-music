<template>
  <div class="footer">
    <music-player></music-player>
  </div>
</template>

<script>
import MusicPlayer from '@/components/music-player/music-player'

export default {
  name: 'MusicFooter',
  components: { MusicPlayer }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 100%;
}
</style>
