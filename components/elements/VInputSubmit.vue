<template>
  <input v-bind="$attrs" type="submit" class="input" v-on="$listeners">
</template>

<script>

export default {}

</script>

<style lang="scss" scoped>

.input {
  padding: .8em .4em;
  width: 100%;
  background-color: #349A89;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  color: var(--color-font-in-colorful);
  cursor: pointer;
}

</style>
