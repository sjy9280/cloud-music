module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/style/element-variables.scss';`
      }
    }
  }
}
