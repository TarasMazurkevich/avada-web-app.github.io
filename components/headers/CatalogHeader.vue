<template>
  <header v-bind="$attrs" class="header">
    <Logo class="header-logo" logo-type="light" />
    <span v-if="!isOpen" class="header-iconMenu" @click="toggleMenu"><i class="fas fa-bars" /></span>
    <span v-else class="header-iconMenu" @click="toggleMenu"><i class="fas fa-times" /></span>
    <div :class="{opened: isOpen}" class="header_menu">
      <VButton class="header-add" @click="goToLink">
        + Add
      </VButton>
      <nuxt-link class="header-link" to="/login">
        Login
      </nuxt-link>
    </div>
    <div :class="{opened: isOpen}" class="header_form_wrap">
      <slot>Hello</slot>
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
    },
    goToLink () {
      this.$router.push('voucher/add')
    }
  }
}

</script>

<style lang="scss" scoped>

.header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-template-areas: 'logo icon' 'form form' 'menu menu';
  align-items: center;
  padding: 15px 25px;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #090810 0%, #171236 100%);
  font-family: inherit;

  @media screen and (min-width: 991px) {
    grid-template-rows: repeat(2, auto);
    grid-template-areas: 'logo menu' 'form form';
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
    color: var(--color-font-in-colorful);

    @media screen and (min-width: 991px) {
      display: none;
    }
  }

  &_menu {
    grid-area: menu;
    display: none;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: {
      width: 1px;
      style: solid;
      color: #fff;
    }

    @media screen and (min-width: 991px) {
      justify-self: flex-end;
      display: flex;
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }

    &.opened {
      display: flex;
    }
  }

  &-add {
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
    margin-left: 30px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--color-font-in-colorful);
    cursor: pointer;

    @media screen and (min-width: 991px) {
      font-size: 14px;
    }
  }

  &_form_wrap {
    grid-area: form;
    display: none;
    flex-direction: column;
    margin-top: 15px;

    @media screen and (min-width: 991px) {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr;
      grid-column-gap: 8px;
      width: 80%;
      margin: 0 auto;
      margin-top: 45px;
    }

    & > *:not(:first-child) {
      margin-top: 5px;

      @media screen and (min-width: 991px) {
        margin-top: 0;
      }
    }

    &.opened {
      display: flex;
    }
  }
}

</style>
