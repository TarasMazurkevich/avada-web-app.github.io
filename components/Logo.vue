<template>
  <img v-bind="$attrs" class="logo" :src="`/logo/${linkLogo}.svg`" alt="Main company logo">
</template>

<script>

export default {
  props: {
    logoType: {
      type: String
    }
  },
  computed: {
    linkLogo () {
      if (this.logoType === 'dark') {
        return 'dark-logo'
      } else {
        return 'light-logo'
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.logo {
  width: 100%;
  height: 100%;
}

</style>
