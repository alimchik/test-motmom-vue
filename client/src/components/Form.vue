<template>
  <form class="form" @submit.prevent="submitHandler">
    <Field
      nameFieldText='Название товара'
      nameField='name'
      placeholder='Введите строку'
      type='text'
      @handler-value-change='handlerValueChange'
    />
    <Field
      nameFieldText='Количество товра'
      nameField='count'
      placeholder='шт'
      type='text'
      @handler-value-change='handlerValueChange'
    />
    <Field
      nameFieldText='Стоимость товара'
      nameField='price'
      placeholder='руб.'
      type='text'
      @handler-value-change='handlerValueChange'
    />
    <Field
      nameFieldText='Дата добавления'
      nameField='date_add'
      placeholder=''
      type='date'
      @handler-value-change='handlerValueChange'
    />
    <button @submit="submitHandler">{{ title }}</button>
  </form>
</template>

<script>
import Field from './Field'

export default {
  data () {
    return {
      product: {
        name: '',
        count: '',
        price: '',
        date_add: ''
      }
    }
  },
  props: ['title'],
  components: {
    Field
  },

  methods: {
    handlerValueChange (field) {
      this.product = { ...this.product, ...field }
    },
    submitHandler () {
      const product = {
        name: this.product.name,
        count: this.product.count,
        price: this.product.price,
        date_add: this.product.date_add
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
          console.log(data)
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
