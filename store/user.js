const state = {
  user: {
    id: '',
    fullName: '',
    email: '',
    password: '',
    favorites: []
  }
}

const getters = {
  USER: state => state.user
}

const mutations = {
  SET_USER: (state, newUser) => {
    state.user = newUser
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
