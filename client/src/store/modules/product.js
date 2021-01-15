import axios from 'axios'

export default {
  state: {
    products: []
  },
  getters: {
    allProducts (state) {
      return state.products.map(item => {
        item.selected = false
        return item
      })
    }
  },
  mutations: {
    insertProducts (state, result) {
      state.products = result
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
