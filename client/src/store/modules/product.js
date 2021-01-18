import axios from 'axios'
import formatData from '../../helpers/formatData.js'

export default {
  state: {
    products: []
  },
  getters: {
    allProducts (state) {
      return state.products.map(item => {
        return { ...item, date_add: formatData(item.date_add, 'yyyy-mm-dd') }
      })
    },
    isSomeItemSelected (state) {
      return state.products.some(item => item.selected === true)
    }
  },
  mutations: {
    insertProducts (state, result) {
      const result2 = result.map(item => {
        item.selected = false
        return item
      })

      state.products = result2
    },

    updateCheckProduct (state, id) {
      const result = state.products.map(item => {
        if (item._id === id) {
          return { ...item, selected: !item.selected }
        }
        return item
      })

      state.products = [...result]
    },

    updateAllCheckProduct (state, check) {
      const result = state.products.map(item => {
        return { ...item, selected: check }
      })
      state.products = [...result]
    }
  },
  actions: {
    async getProducts ({ commit }, param = '') {
      let result = []
      const qweryParams = param ? `?name=${param}` : ''
      const url = new URL(qweryParams, 'http://localhost:5000/api/product')
      try {
        result = await axios.get(url)
      } catch (e) {
        throw new Error(e.response.data.message)
      }
      commit('insertProducts', result.data)
    },

    async getProduct ({ commit }, id) {
      let result = []
      try {
        result = await axios.get(`http://localhost:5000/api/product/${id}`)
      } catch (e) {
        throw new Error(e.response.data.message)
      }
      return Promise.resolve(result.data)
    },

    async removeProduct ({ dispatch }, ids) {
      let result = []
      try {
        result = await axios({
          method: 'DELETE',
          url: 'http://localhost:5000/api/product',
          data: {
            data: ids
          }
        })
      } catch (e) {
        throw new Error(e.response.data.message)
      }

      if (result.status === 200) {
        await dispatch('getProducts')
        return Promise.resolve(result.data.message)
      }
    },

    async removeProductsMulti ({ dispatch, state }) {
      const arrIds = state.products.filter(item => item.selected)
      await dispatch('removeProduct', arrIds)
    },

    async addProduct ({ commit, dispatch }, product) {
      let status = null
      let result = []
      try {
        result = await axios.post('http://localhost:5000/api/product/add', product)
        status = result.status
      } catch (e) {
        throw new Error(e.response.data.message)
      }

      if (status === 201) {
        await dispatch('getProducts')
        return Promise.resolve(result.data.message)
      }
    },

    async editProduct ({ dispatch }, product) {
      let result = []
      try {
        result = await axios.patch(`http://localhost:5000/api/product/${product.id}`, product)
      } catch (e) {
        throw new Error(e.response.data.message)
      }
      await dispatch('getProducts')
      return Promise.resolve(result.data.message)
    }
  }
}
