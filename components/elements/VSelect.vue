<template>
  <div class="select-wrap">
    <span class="select-icon"><i :class="classIcon" /></span>
    <select v-bind="$attrs" :value="value" class="select" :class="{error: isError}" @input="selectHendler($event.target.value)">
      <slot />
    </select>
  </div>
</template>

<script>

export default {
  props: ['value', 'classIcon', 'isError'],

  methods: {
    selectHendler (value) {
      this.$emit('input', value)
    }
  }
}

</script>

<style lang="scss" scoped>

.select {
  padding: .6em;
  width: 100%;
  background-color: #F9FAFB;
  border: 1px solid #DEDEE0;
  border-radius: 5px;

  &.error {
    border-color: #f00;
  }
}

</style>
