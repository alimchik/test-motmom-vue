<template>
  <header class="header-navbar bg-white ">
    <div class="container-fluid pr-3 pl-3 pr-sm-5 pl-sm-5">
      <div class="row">
        <div class="col d-flex justify-content-end">
          <button type="button" class="btn btn-primary btn-lg" v-if="isLoggedIn" @click="logout">
            Выйти
          </button>
          <div class="d-flex justify-content-end" v-else>
            <router-link type="button" class="btn btn-primary btn-lg mr-3" to="/login">Войти</router-link>
            <router-link type="button" class="btn btn-primary btn-lg " to="/registration">Регистрация</router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">

.header-navbar {
  height: 80px;
  display: flex;
  align-items: center;
}
</style>
