<template>
  <header class="navbar">
    <div class="container">
      <div class="btn-container">
        <button class="btn-container__logout btn" v-if="isLoggedIn" @click="logout">
          Выйти
        </button>
        <div class="btn-wrap" v-else>
          <router-link class="btn-wrap__login btn mar-right" to="/login">Войти</router-link>
          <router-link class="btn-wrap__registration btn" to="/registration">Регистрация</router-link>
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

.navbar {
  height: 80px;
  background-color: #fff;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  .btn {
    height: 50px;
    width: 140px;
    border-radius: 45px;
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    color: #fff;
    background-color: rgba(7, 92, 58, 0.9);
    box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
    transition: .3s;

    &:hover {
      background: #2EE59D;
      box-shadow: 0 15px 20px rgba(21, 133, 88, 0.4);
      transform: translateY(-7px);
    }
  }

  &__logout {
    border: none;
  }
}

.btn-wrap {
  display: flex;

  .mar-right {
    margin-right: 15px;
  }

  a {
    text-decoration: none;
    line-height: 50px;
  }
}

</style>
