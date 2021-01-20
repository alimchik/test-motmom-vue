import { myAxios } from '@/api/http-common'

export default {
  state: {
    status: '',
    user: {},
    token: localStorage.getItem('token') || ''
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },

  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.user = { ...{} }
      localStorage.removeItem('token')
    }
  },
  actions: {
    async registr ({ commit }, user) {
      try {
        const result = await myAxios.post('auth/registr', user)
        if (result.status === 201) {
          return Promise.resolve(result.data.message)
        }
      } catch (e) {
        throw new Error(e.response.data.message)
      }
    },
    async login ({ commit }, user) {
      commit('auth_request')
      try {
        const result = await myAxios.post('auth/login', user)
        if (result.status === 200) {
          const token = result.data.token
          const user = result.data.user
          localStorage.setItem('token', result.data.token)
          commit('auth_success', token, user)
        }
      } catch (e) {
        throw new Error(e.response.data.message)
      }
    }
  }
}
