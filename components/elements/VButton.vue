<template>
  <button class="button" v-bind="$attrs" v-on="$listeners">
    <slot>Sell</slot>
  </button>
</template>

<script>

export default {}

</script>

<style lang="scss">

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: var(--color-green-main);
  font-size: 12px;
  text-transform: uppercase;
  color: var(--color-font-in-colorful);
  cursor: pointer;

  @media screen and (min-width: 991px) {
    font-size: 16px;
  }
}

</style>
