<template>
  <label class="label">
    <p class="label-txt"><slot /></p>
    <input v-bind="$attrs" :value="value" class="input" :class="{error: isError}" @input="inputHendler($event.target.value)">
  </label>
</template>

<script>

export default {
  props: ['value', 'isError'],

  methods: {
    inputHendler (value) {
      this.$emit('input', value)
    }
  }
}

</script>

<style lang="scss" scoped>

.label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  color: var(--color-font-primary);

  @media screen and (min-width: 991px) {
    font-size: 16px;
  }

  &-txt {
    margin-bottom: 10px;
  }
}

.input {
  padding: 1em .6em;
  width: 100%;
  background-color: #F9FAFB;
  border: 1px solid #DEDEE0;
  border-radius: 5px;

  @media screen and (min-width: 991px) {
    padding: .6em .6em;
  }

  &.error {
    border-color: #f00;
  }
}

</style>
