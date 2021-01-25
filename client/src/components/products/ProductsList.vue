<template>
  <div>
    <section>
      <div class="container-fluid pr-3 pl-3 pr-sm-5 pl-sm-5">
        <div class='title'>
          <h1>Товары</h1>
        </div>

        <div class='search-container'>
            <div class='search'>
              <span><i class="fa fa-search"></i></span>
              <input type='text' placeholder='Поиск' v-model="inputValue" @input="findProduct"/>
            </div>
            <div class="btn-container">
              <button class="m-right"
                      @click="removeProducts"
                      :disabled="!isSomeItemSelected"
                      :class="{active: isSomeItemSelected}"
              >Удалить товары</button>
              <my-link
                :classes="['add']"
                component='product-new'
              >
                Добавить товар
              </my-link>
            </div>
          </div>
      </div>
    </section>
    <section>
      <div class="container-fluid pr-3 pl-3 pr-sm-5 pl-sm-5">
        <table>
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
                <my-link component='product-edit' :params="{ id: product._id }">
                  <i class='fas fa-edit edit-product'></i>
                </my-link>
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
import Link from '../common/Link'

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
  },

  components: {
    'my-link': Link
  }
}
</script>

<style lang="scss">
.title {
    padding-top: 40px;
}

.search-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;

  .m-right {
    margin-right: 0.5rem;
  }

  .search {
    display: flex;
    align-items: center;
    min-width: 271px;
    max-width: 450px;
    width: 100%;
    border-radius: 5px;
    border: 2px solid #dad5d5;

    input {
      border: none;
      padding: 6px 12px;
      width: 100%;
      &:focus {
        outline:none;
      }
    }

    i {
      color: #dad5d5;
    }

    span {
      margin-left: 8px;
    }

    // &:focus {
    //   color: #495057;
    //   background-color: #fff;
    //   border-color: #80bdff;
    //   outline: 0;
    //   box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25)
    // }

  }
  .btn-container {
    display: flex;
    button {
      display: block;
      font-weight: 400;
      text-align: center;
      color: #fff;
      background-color: #dc3545;
      border-color: #dc3545;
      opacity: .65;
      border: 1px solid transparent;
      padding: .375rem .75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: .25rem;
      cursor: auto;
      transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .active {
      opacity: 1;
      cursor: pointer;
      &:hover {
        background-color: #c82333;
        border-color: #bd2130;
      }
      &:focus {
        background-color: #c82333;
        border-color: #bd2130;
        box-shadow: 0 0 0 0.2rem rgba(225,83,97,.5);
      }
    }

    a {
      text-decoration: none;
      display: block;
      font-weight: 400;
      text-align: center;
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
      border: 1px solid transparent;
      padding: .375rem .75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: .25rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

      &:hover {
        background-color: #218838;
        border-color: #1e7e34;
      }
      &:focus {
        background-color: #218838;
        border-color: #1e7e34;
        box-shadow: 0 0 0 0.2rem rgba(72,180,97,.5);
      }
      &:active {
        background-color: #1e7e34;
        border-color: #1c7430;
      }
    }
  }
  @media screen and (max-width:  846px) {
    .search {
      max-width: 100%;
      margin-bottom: 10px;
    }

    .btn-container {
      width: 100%;
      justify-content: space-between;

      button {
        flex-grow: 1;
      }
      a {
        flex-grow: 1;
      }
    }
  }
}

// Таблица
table {
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

      td {
        padding: 15px 10px;
        border-bottom: 1px solid #e8e9eb;
      }
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

@media screen and (max-width:  660px) {
  table, thead, tbody, th, td, tr {
    display: block;
      thead {
      tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }
    }
    tbody {
      tr {
        margin: 0 0 1rem 0;

        &:nth-child(odd) {
          background: #ccc;
        }

        td {
          position: relative;
          padding: 20px 15px 20px 50%;

          &::before {
            position: absolute;
            left: 10px;
            width: 45%;
            padding-right: 10px;
            font-weight: bold;
          }
          &:nth-of-type(2) {
            &::before {
              content: "Название";
            }
          }
          &:nth-of-type(3) {
            &::before {
              content: "Количество(шт)";
            }
          }
          &:nth-of-type(4) {
            &::before {
              content: "Цена(руб)";
            }
          }
          &:nth-of-type(5) {
            &::before {
              content: "Дата добавления";
            }
          }
        }
      }
    }
  }
}
</style>
