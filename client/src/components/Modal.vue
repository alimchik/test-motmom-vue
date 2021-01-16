<template>
  <portal to="modal-window">
    <div class="modal-background" @click="closeModal">
    </div>
    <div class="window">
      <div class="header">
        <h3>Добавить</h3>
        <router-link to='/products'>
          <i class='fas fa-times'></i>
        </router-link>
      </div>
      <div className="body">
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  methods: {
    closeModal: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.3);
}
.window {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-height: 200px;
  min-width: 320px;
  max-width: 600px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;

  .header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding: 20px 20px;

    i {
      color: rgb(0, 0, 0);

      &:hover {
        color: rgb(136, 6, 6);
      }
    }
  }
}
</style>
