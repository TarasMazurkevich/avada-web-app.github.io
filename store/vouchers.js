const state = {
  vouchers: [],
  filteredVouchers: []
}

const getters = {
  VOUCHERS: state => state.vouchers,
  FILTERED_VOUCHERS: state => state.filteredVouchers
}

const mutations = {
  SET_VOUCHERS: (state, newVoucherList) => {
    state.vouchers = newVoucherList
  },
  SET_FILTERED_VOUCHERS: (state, newVoucherList) => {
    state.filteredVouchers = newVoucherList
  }
}

const actions = {
  GET_VOUCHERS ({ state, getters, commit }) {
    const collection = this.$fireStore.collection('vouchers')

    try {
      collection.get().then((snapshot) => {
        const vouchersFromFirestore = []

        snapshot.forEach((doc) => {
          vouchersFromFirestore.push({
            id: doc.id,
            ...doc.data()
          })
        })

        return vouchersFromFirestore
      }).then((result) => {
        commit('SET_VOUCHERS', result)
        commit('SET_FILTERED_VOUCHERS', result)
      })
    } catch (err) {
      console.log(err)
    }

    return collection
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
