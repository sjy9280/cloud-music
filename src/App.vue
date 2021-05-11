<template>
  <div class="app">
    <router-view></router-view>
    <audio ref="audio"></audio>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
</style>
<script>

import { mapMutations } from 'vuex'

export default {
  created () {
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.audio)
    })
  },
  methods: {
    ...mapMutations({
      setAudioEle: 'SET_AUDIOELE'
    })
  }
}
</script>
