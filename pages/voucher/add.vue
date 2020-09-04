<template>
  <div class="create">
    <VoucherHeader />
    <main class="create_main">
      <div class="create_card">
        <h1 class="create-title">
          Add product
        </h1>
        <form class="create_form" @submit.prevent="addNewVoucher">
          <VInput v-model.trim="$v.title.$model" :is-error="$v.title.$error" placeholder="For example: Iron man suit" type="text" required>
            Title
          </VInput>
          <VInput v-model.trim="$v.location.$model" :is-error="$v.location.$error" placeholder="For example: Los Angeles, CA" type="text" required>
            Location
          </VInput>
          <label class="create-label">
            <h3 class="create-label-txt">Category</h3>
            <VSelect v-model.trim="$v.category.$model" name="category" required>
              <option value="all" selected="selected">
                All
              </option>
              <option value="fire">
                Fire voucher
              </option>
              <option value="water">
                Water voucher
              </option>
            </VSelect>
          </label>
          <VTextArea v-model.trim="description" cols="30" rows="10">
            Decription
          </VTextArea>
          <label class="create-label ">
            <h3 class="create-label-txt">Photo</h3>
            <div class="create_input_wrap">
              <img v-show="imageUrl" :src="imageUrl" alt="Avatar" class="create_input_avatar">
              <div class="create_input_clone">
                <span class="create_input_clone-icon">
                  <i class="fas fa-plus" />
                </span>
              </div>
              <input class="create-input-file" type="file" @change="changePhoto($event)">
            </div>
          </label>
          <label class="create-label">
            <h3 class="create-label-txt">Price</h3>
            <VInputNumber v-model.trim.number="$v.price.$model" required>
              Price
            </VInputNumber>
          </label>
          <VInputSubmit class="create-submit" value="Submit" />
        </form>
      </div>
    </main>
    <vue-snotify />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import VoucherHeader from '~/components/headers/VoucherHeader'
import VInput from '~/components/elements/VInput'
import VInputNumber from '~/components/elements/VInputNumber'
import VSelect from '~/components/elements/VSelect'
import VTextArea from '~/components/elements/VTextArea'

export default {
  components: {
    VoucherHeader,
    VInput,
    VInputNumber,
    VSelect,
    VTextArea
  },
  data () {
    return {
      title: '',
      location: '',
      category: '',
      price: 0,
      description: '',
      photo: '',
      photoUrl: '',
      imageUrl: '',
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
      const vm = this

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
    },
    changePhoto (e) {
      this.photo = e.target.files[0]

      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.imageUrl = e.target.result
      }
      reader.readAsDataURL(this.photo)
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

<style lang="scss">

.create {
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

  &-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

  &_input_wrap {
    display: flex;
    align-items: center;
    padding: .2em .5em;
    width: 100%;
    height: 50px;
    background-color: #F9FAFB;
    border: 1px solid #DEDEE0;
    box-sizing: border-box;
    border-radius: 5px;

    @media screen and (min-width: 991px) {
      height: 100px;
    }
  }

  &_input_avatar {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    object-fit: cover;

    @media screen and (min-width: 991px) {
      width: 90px;
      height: 90px;
    }
  }

  &_input_clone {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #E4E4E4;
    border-radius: 4px;

    @media screen and (min-width: 991px) {
      width: 90px;
      height: 90px;
    }
  }

  &-input-file {
    display: none;
  }
}

</style>
