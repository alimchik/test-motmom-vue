<template>
  <label class='field'>
    <span class='label'>
      {{ nameFieldText }}
    </span>

    <input
      class='input'
      :type='type'
      :placeholder='placeholder'
      v-model="inputValue"
      value=""
      @input="handlerValueChange"
    />

    <!-- <span class='error'>
      {!!error ? error : ''}
    </span> -->
  </label>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  props: {
    nameFieldText: String,
    nameField: String,
    type: String,
    placeholder: String
  },
  methods: {
    handlerValueChange: function () {
      this.$emit('handler-value-change', { [this.nameField]: this.inputValue })
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.label {
    margin-bottom: 5px;
}

.input {
    margin-bottom: 0 !important;
    display: block;
    width: 100%;
    padding: 0 10px;
    line-height: 40px;
}

.error {
    display: block;
    height: 16px;
    font-size: 13px;
    color: red;
}
</style>
