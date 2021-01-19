<template>
  <main>
    <ProductsList />
    <router-view></router-view>
  </main>
</template>

<script>
import ProductsList from '../../components/products/ProductsList'

export default {
  components: {
    ProductsList
  }
}
</script>
