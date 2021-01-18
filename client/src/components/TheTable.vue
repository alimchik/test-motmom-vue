<template>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: mapGetters(['allProducts']),

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
    }
  },

  async mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
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
