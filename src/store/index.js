import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    block_selected: window.localStorage.getItem('block_selected') || 0
  },
  mutations: {
    setBlockSelected (state, payload) {
      state.block_selected = payload
      window.localStorage.setItem('block_selected', payload)
    }
  },
  actions: {},
  modules: {}
})
