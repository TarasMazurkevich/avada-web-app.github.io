<template>
  <div class="login">
    <AuthHeader class="login_header" />
    <main class="login_main">
      <div class="login_card">
        <h1 class="login-title">
          Login
        </h1>
        <form class="login_form" @submit.prevent="login">
          <VInput v-model.trim="$v.email.$model" :is-error="$v.email.$error" placeholder="Example@gmail.com" type="email" required>
            Email
          </VInput>
          <VInputPassword v-model.trim="$v.password.$model" :is-error="$v.password.$error" required>
            Password
          </VInputPassword>
          <VInputSubmit class="login-submit" value="Continue" />
        </form>
      </div>
      <div class="login_card">
        <p class="login-registrate">
          I have no account,
          <nuxt-link class="login-registrate-link" to="registrate">
            register now
          </nuxt-link>
        </p>
      </div>
    </main>
    <footer class="login_footer" />
    <vue-snotify />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import AuthHeader from '~/components/headers/AuthHeader'
import VInput from '~/components/elements/VInput'
import VInputPassword from '~/components/elements/VInputPassword'
import VInputSubmit from '~/components/elements/VInputSubmit'

export default {
  components: {
    AuthHeader,
    VInput,
    VInputPassword,
    VInputSubmit
  },
  data () {
    return {
      email: 'zbabarfb98@ntilsibi.tk',
      password: 'qwerty123',
      submitStatus: ''
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    async login () {
      const vm = this
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        try {
          const self = this

          await this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
          await this.$fireStore.collection('users')
            .where('email', '==', this.email)
            .get()
            .then((querySnapshot) => {
              let currentUser

              querySnapshot.forEach((snapshot) => {
                currentUser = {
                  id: snapshot.id,
                  ...snapshot.data()
                }
              })

              self.$store.commit('SET_USER', currentUser)
            })

          this.submitStatus = 'OK'
          this.$router.push('/')
        } catch (error) {
          const errorMessage = error.message
          vm.$snotify.error(`${errorMessage}`, {
            timeout: 5000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.submitStatus = 'ERROR'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.login {
  &_main {
    margin-top: 15px;
    padding: 0 25px;
    width: 100%;
    padding-bottom: 20px;

    @media screen and (min-width: 991px) {
      margin-top: 80px;
    }
  }

  &_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 24px;
    background-color: var(--color-bg-block);
    box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
    border-radius: 7px;

    @media screen and (min-width: 991px) {
      margin: 0 auto;
      padding: 25px;
      width: 30%;
    }

    &:not(:first-child) {
      margin-top: 15px;

      @media screen and (min-width: 991px) {
        margin-top: 20px;
      }
    }
  }

  &-title {
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    color: var(--color-font-primary);

    @media screen and (min-width: 991px) {
      font-size: 27px;
    }
  }

  &_form {
    margin-top: 15px;
    width: 100%;

    & label:not(:first-child) {
      margin-top: 15px;
    }
  }

  &-submit {
    margin-top: 15px;
  }

  &-registrate {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;

    @media screen and (min-width: 991px) {
      font-size: 16px;
    }

    &-link {
      text-transform: uppercase;
      color: var(--color-green-main);
    }
  }
}

</style>
