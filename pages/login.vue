<template>
  <div class="container">
    <form @submit.prevent="login">
      <input v-model.trim="$v.email.$model" type="email">
      <input v-model.trim="$v.password.$model" type="password">
      <input type="submit" value="Login">
    </form>
    {{ submitStatus }}
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
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
                currentUser = { ...snapshot.data() }
              })

              self.$store.commit('SET_USER', currentUser)
            })

          this.submitStatus = 'OK'
          this.$router.push('/')
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
