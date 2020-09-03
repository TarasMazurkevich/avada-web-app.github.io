<template>
  <div class="container">
    <form @submit.prevent="createNewUser">
      <input v-model.trim="$v.email.$model" type="email">
      <input v-model.trim="$v.fullName.$model" type="text">
      <input v-model.trim="$v.password.$model" type="password">
      <input v-model.trim="$v.passwordRepeat.$model" type="password">
      <input type="submit" value="Registrate">
    </form>
    {{ submitStatus }}
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
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

<style>

</style>
