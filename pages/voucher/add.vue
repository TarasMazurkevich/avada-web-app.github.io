<template>
  <div class="container">
    <form @submit.prevent="addNewVoucher">
      <input v-model.trim="$v.title.$model" type="text">
      <input v-model.trim="$v.location.$model" type="text">
      <input v-model.trim="$v.category.$model" type="text">
      <textarea v-model.trim="description" name="description" cols="30" rows="10" />
      <div>
        <input type="file" @change="changePhoto($event)">
      </div>
      <input v-model.trim="$v.price.$model" type="text">
      <input type="submit" value="Create">
    </form>
    {{ submitStatus }}
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      title: '',
      location: '',
      category: '',
      price: 0,
      description: '',
      photo: '',
      photoUrl: '',
      submitStatus: ''
    }
  },
  validations: {
    title: {
      required
    },
    location: {
      required
    },
    category: {
      required
    },
    price: {
      required
    }
  },
  methods: {
    addNewVoucher () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        try {
          const vm = this
          this.uploadPhotoToFirebase(async () => {
            await vm.$fireStore.collection('vouchers').add({
              title: vm.title,
              location: vm.location,
              category: vm.category,
              price: vm.price,
              description: vm.description,
              photo: vm.photoUrl
            })

            vm.submitStatus = 'OK'
            vm.$router.push('/')
          })
        } catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(`${errorCode}: ${errorMessage}`)
          this.submitStatus = 'ERROR'
        }
      }
    },
    changePhoto (e) {
      this.photo = e.target.files[0]
    },
    uploadPhotoToFirebase (callback) {
      if (!this.photo) { return false }

      const vm = this
      const storageRef = this.$fireStorage.ref()
      const uploadTask = storageRef.child(this.photo.name).put(this.photo)

      uploadTask.on(vm.$fireStorageObj.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          switch (snapshot.state) {
            case vm.$fireStorageObj.TaskState.PAUSED:
              console.log('Upload is paused')
              break
            case vm.$fireStorageObj.TaskState.RUNNING:
              console.log('Upload is running')
              break
          }
        }, function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              break
            case 'storage/canceled':
              break
            case 'storage/unknown':
              break
          }
        }, function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            vm.photoUrl = downloadURL
            callback()
            console.log(vm.photoUrl)
          })
        })
    }
  }
}
</script>

<style>

</style>
