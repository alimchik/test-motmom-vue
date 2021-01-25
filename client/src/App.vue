<template>
  <div id="app">
    <portal-target name="modal-window"></portal-target>
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar'
import 'vue-toast-notification/dist/theme-sugar.css'

export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10px 20px;
  height: 100%;
}

</style>
