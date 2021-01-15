import axios from 'axios'

export default {
  state: {
    products: []
  },
  getters: {
    allProducts (state) {
      return state.products
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
    async getProducts (ctx, param = '') {
      let result = []
      const qweryParams = param ? `?name=${param}` : ''
      const url = new URL(qweryParams, 'http://localhost:5000/api/product')
      try {
        result = await axios.get(url)
      } catch (e) {
        // toast.error(e.response.data.message);
        console.log(e.response.data.message)
      }
      ctx.commit('insertProducts', result.data)
    }
  }
}
