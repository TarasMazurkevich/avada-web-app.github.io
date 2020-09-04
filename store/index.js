import Vue from 'vue'
import Vuex from 'vuex'

import User from '~/store/user.js'
import Vouchers from '~/store/vouchers.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    User,
    Vouchers
  },
  strict: debug
})

export default store
