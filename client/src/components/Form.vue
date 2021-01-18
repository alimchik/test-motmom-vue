<template>
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
</template>

<script>

export default {
  data () {
    return {
      name: '',
      count: '',
      price: '',
      date_add: ''
    }
  },
  props: ['title'],

  methods: {
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
          this.name = data.name
          this.count = data.count
          this.price = data.price
          this.date_add = data.date_add
        })
        .catch(err => this.$toast.error(err.message))
    }
  }
}
</script>

<style lang="scss">
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
</style>
