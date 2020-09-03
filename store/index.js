import Vue from 'vue'
import Vuex from 'vuex'

import User from '~/store/user.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    User
  },
  strict: debug
})

export default store
