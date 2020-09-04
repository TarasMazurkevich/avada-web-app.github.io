<template>
  <div class="register">
    <AuthHeader class="register_header" />
    <main class="register_main">
      <div class="register_card">
        <h1 class="register-title">
          Register
        </h1>
        <form class="register_form" @submit.prevent="createNewUser">
          <VInput v-model.trim="$v.email.$model" :is-error="$v.email.$error" placeholder="Example@gmail.com" type="email" required>
            Email
          </VInput>
          <VInput v-model.trim="$v.fullName.$model" :is-error="$v.fullName.$error" placeholder="Severus Snape" type="text" required>
            Full name
          </VInput>
          <VInputPassword v-model.trim="$v.password.$model" :is-error="$v.password.$error" required>
            Password
          </VInputPassword>
          <VInputPassword v-model.trim="$v.passwordRepeat.$model" :is-error="$v.passwordRepeat.$error" required>
            Password again
          </VInputPassword>
          <VInputSubmit class="register-submit" value="Register" />
        </form>
      </div>
      <div class="register_card">
        <p class="register-registrate">
          I already have an account,
          <nuxt-link class="register-registrate-link" to="login">
            log in
          </nuxt-link>
        </p>
      </div>
    </main>
    </form>
    {{ submitStatus }}
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
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
      email: '',
      password: '',
      passwordRepeat: '',
      fullName: '',
      submitStatus: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    fullName: {
      required
    },
    password: {
      required
    },
    passwordRepeat: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async createNewUser () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        try {
          const self = this

          await this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
          await this.$fireStore.collection('users').add({
            email: self.email,
            password: self.password,
            fullName: self.fullName,
            favorites: []
          })

          this.submitStatus = 'OK'
          this.$router.push('login')
        } catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(`${errorCode}: ${errorMessage}`)
          this.submitStatus = 'ERROR'
        }
      }
    }
  }
}
</script>

<style lang="scss">

.register {
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
