<template>
  <main>
    <TheHeader />
    <TheTable />
    <router-view></router-view>
  </main>
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheTable from '../components/TheTable'

export default {
  components: {
    TheHeader,
    TheTable
  }
}
</script>
