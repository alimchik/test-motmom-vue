<template>
  <div class="form">
    <h3 v-if="getUrl === 'login'">Войти </h3>
    <h3 v-else>Регистарция</h3>
    <div class="form-row">
      <input type="text" id="email" required><label for="email">Email</label>
    </div>
    <div class="form-row">
      <input type="password" id="password" required><label for="password">Пароль</label>
    </div>
    <button v-if="getUrl === 'login'">Войти</button>
    <button v-else>Регистрация</button>
  </div>
</template>

<script>
export default {
  computed: {
    getUrl: function () {
      return this.$route.path.substring(1, this.$route.path.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  margin: 50px auto 30px;
  padding: 80px 30px 30px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);

  h3 {
    position: relative;
    z-index: 5;
    margin: 0 0 60px;
    text-align: center;
    color: #4a90e2;
    font-size: 30px;
    font-weight: normal;
  }
  .form-row {
    position: relative;
    margin-bottom: 40px;

    input {
      display: block;
      width: 100%;
      padding: 0 10px;
      line-height: 40px;
      font-family: 'Roboto', sans-serif;
      background: none;
      border-width: 0;
      border-bottom: 2px solid #4a90e2;
      transition: all 0.2s ease;

      &:focus {
        outline: 0;
        border-color: #F77A52;
      }

      &:focus + label {
        transform: translateY(-60px);
        margin-left: -14px;
        font-size: 14px;
        font-weight: 400;
        outline: 0;
        border-color: #F77A52;
        color: #F77A52;
      }

      &:valid + label {
        transform: translateY(-60px);
        margin-left: -14px;
        font-size: 14px;
        font-weight: 400;
        outline: 0;
        border-color: #F77A52;
        color: #F77A52;
      }
    }

    label {
      position: absolute;
      left: 13px;
      color: #9d959d;
      font-size: 20px;
      font-weight: 300;
      transform: translateY(-35px);
      transition: all 0.2s ease;
    }
  }

  button {
    width: 100%;
    padding: 0;
    line-height: 42px;
    background: #4a90e2;
    border-width: 0;
    color: white;
    font-size: 20px;
    border-radius: 5px;

    &:focus {
      border-width: 0;
      outline: none;
      background: #4a90e2;
    }

    &:hover {
      background: #63a6f1;
    }
  }
}
</style>
