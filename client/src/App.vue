<template>
  <div id="app">
    <portal-target name="modal-window"></portal-target>
     <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'

export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  line-height: 1.6em;
  background-color: #eaeaea;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10px 20px;
  height: 100%;
}

</style>
