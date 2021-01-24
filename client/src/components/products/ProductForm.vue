<template>
  <portal to="modal-window">
    <div class="modal-background" @click="closeModal">
    </div>
    <div class="window shadow">
      <div class="header p-4">
        <h2 class="h3">{{ title }}</h2>
        <router-link to='/products'>
          <i class='fas fa-times'></i>
        </router-link>
      </div>
      <div class="body">
        <form class="bg-white p-3 border rounded m-4" @submit.prevent="submitHandler">
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="name-product">Название товара</label>
                <input
                  type="text"
                  id="name-product"
                  class="form-control"
                  placeholder="Введите название товара"
                  required
                  v-model="name"
                >
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="count">Количество товара</label>
                <input
                  type="text"
                  id="count"
                  class="form-control"
                  placeholder="шт."
                  required
                  v-model="count"
                >
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="price">Стоимость товара</label>
                <input
                  type="text"
                  id="price"
                  class="form-control"
                  placeholder="руб."
                  required
                  v-model="price"
                >
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="date_add">Дата добавления</label>
                <input
                  type="date"
                  id="date_add"
                  class="form-control"
                  required
                  v-model="date_add"
                >
              </div>
            </div>
          </div>
          <button @submit="submitHandler" class="btn btn-outline-success btn-lg btn-block">{{ title }}</button>
        </form>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      count: '',
      price: '',
      date_add: ''
    }
  },

  computed: mapGetters(['product']),

  props: ['title'],

  methods: {
    closeModal: function () {
      this.$router.go(-1)
    },

    submitHandler () {
      const product = {
        name: this.name,
        count: this.count,
        price: this.price,
        date_add: this.date_add
      }

      // если изменяем продукт
      if (this.$route.params.id) {
        this.$store.dispatch('editProduct', { ...product, id: this.$route.params.id })
          .then((data) => {
            this.$emit('go-to-page')
            this.$toast.success(data)
          })
          .catch(err => this.$toast.error(err.message))
        return
      }

      // если добавляем продукт
      this.$store.dispatch('addProduct', product)
        .then((data) => {
          this.$emit('go-to-page')
          this.$toast.success(data)
        })
        .catch(err => this.$toast.error(err.message))
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$store.dispatch('getProduct', this.$route.params.id)
        .then(data => {
          this.name = this.product.name
          this.count = this.product.count
          this.price = this.product.price
          this.date_add = this.product.date_add
        })
        .catch(err => this.$toast.error(err.message))
    }
  }
}
</script>

<style lang="scss">
.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 10;
}

.window {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-height: 200px;
  width: 100%;
  min-width: 320px;
  max-width: 650px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 20;

  .header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;

    i {
      color: rgb(0, 0, 0);

      &:hover {
        color: rgb(136, 6, 6);
      }
    }
  }
}

@media screen and (max-width:  650px) {
  .window {
    height: 100vh;
    width: 100%;
  }
}
</style>
