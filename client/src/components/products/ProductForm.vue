<template>
  <portal to="modal-window">
    <div class="modal-background" @click="closeModal">
    </div>
    <div class="window">
      <div class="header">
        <h3>{{ title }}</h3>
        <router-link to='/products'>
          <i class='fas fa-times'></i>
        </router-link>
      </div>
      <div class="body">
          <form class="form" @submit.prevent="submitHandler">
            <label class='field'>
              <span class='label'>
                Название товара
              </span>
              <input
                class='input'
                type='text'
                placeholder='Введите строку'
                v-model="name"
              />
            </label>
            <label class='field'>
              <span class='label'>
                Количество товра
              </span>
              <input
                class='input'
                type='text'
                placeholder='шт'
                v-model="count"
              />
            </label>
            <label class='field'>
              <span class='label'>
                Стоимость товара
              </span>
              <input
                class='input'
                type='text'
                placeholder='руб.'
                v-model="price"
              />
            </label>
            <label class='field'>
              <span class='label'>
                Дата добавления
              </span>
              <input
                class='input'
                type='date'
                v-model="date_add"
              />
            </label>
            <button @submit="submitHandler">{{ title }}</button>
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
            this.$router.push('/products')
            this.$toast.success(data)
          })
          .catch(err => this.$toast.error(err.message))
        return
      }

      // если добавляем продукт
      this.$store.dispatch('addProduct', product)
        .then((data) => {
          this.$router.push('/products')
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
}

.window {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-height: 200px;
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  .header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding: 20px 20px;

    i {
      color: rgb(0, 0, 0);

      &:hover {
        color: rgb(136, 6, 6);
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    justify-content: space-between;
    .field {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .label {
        margin-bottom: 5px;
    }

    .input {
        margin-bottom: 0 !important;
        display: block;
        width: 100%;
        padding: 0 10px;
        line-height: 40px;
    }

    .error {
        display: block;
        height: 16px;
        font-size: 13px;
        color: red;
    }

    button {
      width: 100%;
      padding: 0;
      line-height: 42px;
      background: #4a90e2;
      border-width: 0;
      color: white;
      font-size: 20px;
      border-radius: 5px;

      &:focus {
        border-width: 0;
        outline: none;
        background: #4a90e2;
      }

      &:hover {
        background: #63a6f1;
      }
    }
  }
}
</style>
