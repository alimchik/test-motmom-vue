<template>
  <div>
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
              <button class="rmvActive"
                      @click="removeProducts"
                      v-bind:class="{ rmvActive: isSomeItemSelected, rmvDisabled: !isSomeItemSelected }"
                      :disabled="!isSomeItemSelected"
              >Удалить товары</button>
              <router-link :to='{name: "product-new"}' class='add'>Добавить товар</router-link>
            </div>
          </div>
      </div>
    </section>
    <section class="table-section ">
      <div class="container">
        <table class="products">
          <thead>
            <tr>
              <th>
                <input type="checkbox" @change="checkProducts($event)" />
              </th>
              <th>Название</th>
              <th>Количество(шт)</th>
              <th>Цена(руб)</th>
              <th>Дата добавления</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in allProducts" :key="product._id">
              <td>
                <input type="checkbox" @change="checkProduct($event, product._id)" :checked="product.selected"/>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.count }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.date_add }}</td>
              <td>
                <router-link :to="{name: 'product-edit', params:{ id: product._id }}"><i class="fas fa-edit edit-product"></i></router-link>
              </td>
              <td>
                <i class="far fa-trash-alt rm-product" @click.prevent="removeProductHandler($event, product._id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      inputValue: ''
    }
  },

  computed: mapGetters(['isSomeItemSelected', 'allProducts']),

  methods: {
    ...mapActions(['getProducts']),
    checkProduct: function (event, id) {
      this.$store.commit('updateCheckProduct', id)
    },

    checkProducts: function (event) {
      this.$store.commit('updateAllCheckProduct', event.target.checked)
    },

    removeProductHandler: function (event, id) {
      const conf = confirm('Вы действительно хотите удалить товар?')
      if (conf) {
        this.$store.dispatch('removeProduct', [id])
          .then((data) => {
            this.$toast.success(data)
          })
          .catch(err => this.$toast.error(err.message))
      }
    },

    removeProducts: function () {
      const conf = window.confirm('Вы действительно хотите удалить товар(ы)?')
      if (conf) {
        this.$store.dispatch('removeProductsMulti')
      }
    },
    findProduct: debounce(function () {
      this.$store.dispatch('getProducts', this.inputValue)
    }, 500)
  },

  async mounted () {
    this.getProducts()
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

// Таблица
.products {
  width: 100%;
  border: 0px;
  border-collapse: collapse;
  text-align: left;
  background: #fff;

  thead {
    background-color: #f0f0f0;

    th {
      padding: 5px 10px;
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #e5ecf0;
      }
    }

    td {
      padding: 15px 10px;
      border-bottom: 1px solid #e8e9eb;
    }
  }

  .edit-product {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  .rm-product {
    cursor: pointer;
  }

  .rm-product:hover {
    color: rgb(153, 18, 18);
  }

}
</style>
