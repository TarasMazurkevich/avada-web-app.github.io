<template>
  <label class="label">
    <p class="label-txt"><slot /></p>
    <div class="input_wrap">
      <input v-bind="$attrs" :value="value" class="input" :type="dynamicInputType" @input="inputHendler($event.target.value)">
      <span class="input-eye" @click="toggleShow">
        <i v-show="isShow" class="far fa-eye-slash" />
        <i v-show="!isShow" class="far fa-eye" />
      </span>
    </div>
  </label>
</template>

<script>

export default {
  props: ['value'],
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    dynamicInputType () {
      if (this.isShow) {
        return 'text'
      } else {
        return 'password'
      }
    }
  },
  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    },
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
  width: 100%;
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

  &_wrap {
    position: relative;
    width: 100%;
  }

  &-eye {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}

</style>
