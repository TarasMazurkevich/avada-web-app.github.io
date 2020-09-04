<template>
  <header v-bind="$attrs" class="header">
    <Logo class="header-logo" logo-type="dark" />
    <span v-if="!isOpen" class="header-iconMenu" @click="toggleMenu"><i class="fas fa-bars" /></span>
    <span v-else class="header-iconMenu" @click="toggleMenu"><i class="fas fa-times" /></span>
    <div :class="{opened: isOpen}" class="header_menu">
      <VButton class="header-sell" />
      <nuxt-link class="header-link" to="/login">
        Login
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import VButton from '~/components/elements/VButton'

export default {
  components: {
    Logo,
    VButton
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    }
  }
}

</script>

<style lang="scss" scoped>

.header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-template-areas: 'logo icon' 'menu menu';
  align-items: center;
  padding: 15px 25px;
  width: 100%;
  height: 100%;
  font-family: inherit;

  @media screen and (min-width: 991px) {
    grid-template-rows: auto;
    grid-template-areas: 'logo menu';
    padding: 18px 100px;
  }

  &-logo {
    grid-area: logo;
    width: 100px;
    height: 40px;
  }

  &-iconMenu {
    grid-area: icon;
    justify-self: end;

    @media screen and (min-width: 991px) {
      display: none;
    }
  }

  &_menu {
    grid-area: menu;
    display: none;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: {
      width: 1px;
      style: solid;
      color: #000;
    }

    @media screen and (min-width: 991px) {
      justify-self: flex-end;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }

    &.opened {
      display: flex;
    }
  }

  &-sell {
    width: 30%;
    height: 20px;
    font-family: 'Roboto', sans-serif;

    @media screen and (min-width: 991px) {
      width: auto;
      height: auto;
      padding: .6em 3em;
      font-size: 14px;
    }
  }

  &-link {
    margin-top: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;

    @media screen and (min-width: 991px) {
      margin-top: 0;
      margin-left: 30px;
      font-size: 14px;
    }
  }
}

</style>
