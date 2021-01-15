<template>
  <section>
    <div class="container">
      <div class='title'>
          <h1>Товары</h1>
      </div>

      <div class='search-container'>
          <div class='search'>
            <span><i class="fa fa-search"></i></span>
            <input type='text' placeholder='Поиск' v-model="inputValue" @input="findProduct"/>
          </div>
          <div class="btnContainer">
            <button class="rmvActive" @click="removeProducts">Удалить товары</button>
            <router-link to='products/add' class='add'>Добавить товар</router-link>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data () {
    return {
      inputValue: ''
    }
  },

  methods: {
    removeProducts: function () {
      const conf = window.confirm('Вы действительно хотите удалить товар(ы)?')
      if (conf) {
        this.$store.dispatch('removeProductsMulti')
      }
    },
    findProduct: debounce(function () {
      this.$store.dispatch('getProducts', this.inputValue)
    }, 500)
  }
}
</script>

<style lang="scss">
.title {
    padding-top: 40px;
    margin-bottom: 10px;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;

  .search {
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 2px solid #dad5d5;

    input {
      border: none;
      height: 30px;
      width: 300px;
      border-radius: 5px;
      font-size: 14px;

      &:focus {
        outline:none;
      }
    }

    i {
      color: #dad5d5;
    }

    span {
      margin: 0 5px;
    }

  }
  .btnContainer {
    display: flex;
    button {
      border-radius: 5px;
      border: none;
      color: #fff;
      width: 180px;
      height: 30px;
      font-size: 16px;

      &.add {
        background: #24e307;
        cursor: pointer;
      }

      &.rmvActive {
        background: #e41313;
        cursor: pointer;
      }

      &.rmvDisabled {
        color: #8a8a8a;
        background: #804e4e;
      }

      &:focus {
        outline:none;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
    a {
      border-radius: 5px;
      border: none;
      color: #fff;
      width: 180px;
      height: 30px;
      font-size: 16px;
      display: inline-block;
      text-decoration: none;
      line-height: 31px;
      text-align: center;
      &.add {
        background: #24e307;
        cursor: pointer;
      }
    }
  }
}
</style>
