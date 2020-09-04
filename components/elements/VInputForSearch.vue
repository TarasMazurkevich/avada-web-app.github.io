<template>
  <div class="input_wrap">
    <span class="input-icon"><i :class="classIcon" /></span>
    <input v-bind="$attrs" :value="value" class="input" @input="inputHendler($event.target.value)">
  </div>
</template>

<script>

export default {
  props: ['value', 'classIcon'],

  methods: {
    inputHendler (value) {
      this.$emit('input', value)
    }
  }
}

</script>

<style lang="scss" scoped>

.input {
  padding: .5em .6em;
  padding-left: 2.5em;
  width: 100%;
  background-color: #F9FAFB;
  border: 1px solid #DEDEE0;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;

  @media screen and (min-width: 991px) {
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 14px;
  }

  &_wrap {
    position: relative;
    width: 100%;
  }

  &-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(50%, -50%);
    color: var(--color-font-secondary);
  }
}

</style>
