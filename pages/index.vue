<template>
  <div class="catalog">
    <CatalogHeader class="catalog_header">
      <VInputForSearch v-model.trim="searchForm.name" placeholder="Search products by name" class-icon="fas fa-search" type="search" />
      <VInputForSearch v-model.trim="searchForm.location" placeholder="location" class-icon="fas fa-map-marker-alt" type="location" />
      <VButton class="catalog-search" @click="searchVoucher">
        Search
      </VButton>
    </CatalogHeader>
    <main class="catalog_main">
      <div class="catalog_card">
        <VSelect v-model.trim="filterForm.category" name="category">
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
        <div class="catalog_input-group">
          <VInputNumber v-model.trim.number="filterForm.fromPrice" />
          <span>-</span>
          <VInputNumber v-model.trim.number="filterForm.toPrice" />
        </div>
      </div>
      <ul class="catalog_list">
        <li v-for="(voucher, i) in FILTERED_VOUCHERS" :key="i" class="catalog_item">
          <span v-if="USER.email.length !== 0" class="catalog_item-like" @click="likeVoucher(voucher.id)">
            <i v-show="USER.favorites.indexOf(voucher.id) !== -1" class="fas fa-heart" />
            <i v-show="USER.favorites.indexOf(voucher.id) === -1" class="far fa-heart" />
          </span>
          <img :src="voucher.photo" alt="Poster for voucher" class="catalog_item-poster">
          <div class="catalog_item_desc">
            <h3 class="catalog_item-title">
              {{ voucher.title }}
            </h3>
            <p class="catalog_item-price">
              ${{ voucher.price }}
            </p>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CatalogHeader from '~/components/headers/CatalogHeader'
import VButton from '~/components/elements/VButton'
import VInputNumber from '~/components/elements/VInputNumber'
import VInputForSearch from '~/components/elements/VInputForSearch'
import VSelect from '~/components/elements/VSelect'

export default {
  components: {
    CatalogHeader,
    VButton,
    VInputNumber,
    VInputForSearch,
    VSelect
  },
  data () {
    return {
      filterForm: {
        category: 'all',
        fromPrice: 0,
        toPrice: 0
      },
      searchForm: {
        name: '',
        location: ''
      }
    }
  },
  watch: {
    filterForm: {
      handler () {
        this.filterVouchers()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['VOUCHERS', 'FILTERED_VOUCHERS', 'USER'])
  },
  async created () {
    await this.$store.dispatch('GET_VOUCHERS')
  },
  methods: {
    filterVouchers () {
      this.filterByCategory()
      this.filterByPrice()
      this.resetSearchData()
    },
    searchVoucher () {
      this.filterByCategory()
      this.filterByPrice()
      this.searchByName()
      this.searchByLocation()
    },
    filterByCategory () {
      if (this.filterForm.category === 'all') {
        this.$store.commit('SET_FILTERED_VOUCHERS', this.VOUCHERS)
      } else {
        const filteredVouchers = this.VOUCHERS.filter((voucher, i) => {
          if (voucher.category === this.filterForm.category) {
            return true
          }
        })
        this.$store.commit('SET_FILTERED_VOUCHERS', filteredVouchers)
      }
    },
    filterByPrice () {
      if (this.filterForm.toPrice < this.filterForm.fromPrice || this.filterForm.toPrice === 0) {
        return false
      } else {
        const filteredVouchers = this.FILTERED_VOUCHERS.filter((voucher, i) => {
          if (voucher.price >= this.filterForm.fromPrice && voucher.price <= this.filterForm.toPrice) {
            return true
          }
        })
        this.$store.commit('SET_FILTERED_VOUCHERS', filteredVouchers)
      }
    },
    searchByName () {
      if (this.searchForm.name.length === 0) {
        return false
      } else {
        const filteredVouchers = this.FILTERED_VOUCHERS.filter((voucher, i) => {
          if (voucher.title.toLowerCase().includes(this.searchForm.name.toLowerCase())) {
            return true
          }
        })
        this.$store.commit('SET_FILTERED_VOUCHERS', filteredVouchers)
      }
    },
    searchByLocation () {
      if (this.searchForm.location.length === 0) {
        return false
      } else {
        const filteredVouchers = this.FILTERED_VOUCHERS.filter((voucher, i) => {
          if (voucher.location.toLowerCase().includes(this.searchForm.location.toLowerCase())) {
            return true
          }
        })
        this.$store.commit('SET_FILTERED_VOUCHERS', filteredVouchers)
      }
    },
    resetSearchData () {
      this.searchForm.name = ''
      this.searchForm.location = ''
    },
    likeVoucher (voucherId) {
      const vm = this

      if (this.USER.email.length === 0) {
        return false
      }

      const findIdVoucher = this.USER.favorites.find((id) => {
        if (id === voucherId) {
          return true
        }
      })

      const newFavorites = [...vm.USER.favorites]
      if (findIdVoucher) {
        newFavorites.forEach((favorite, i) => {
          if (favorite === findIdVoucher) {
            newFavorites.splice(i, 1)
          }
        })

        vm.$store.commit('SET_USER', {
          ...vm.USER,
          favorites: newFavorites
        })

        vm.$fireStore
          .collection('users')
          .doc(vm.USER.id)
          .update(vm.$store.state.User.user)
          .then((result) => {
            console.log('All good')
          })
      } else {
        newFavorites.push(voucherId)

        vm.$store.commit('SET_USER', {
          ...vm.USER,
          favorites: newFavorites
        })

        vm.$fireStore
          .collection('users')
          .doc(vm.USER.id)
          .update(vm.$store.state.User.user)
          .then((result) => {
            console.log('All good')
          })
      }
    }
  }
}
</script>

<style lang="scss">

.catalog {

  &-search {
    padding: .5em 3em;
    background-color: #3E3961 !important;
    font-family: 'Roboto', sans-serif;
  }

  &_main {
    padding: 15px 25px;
    width: 100%;
    padding-bottom: 20px;

    @media screen and (min-width: 991px) {
      padding: 18px 100px;
    }
  }

  &_card {
    padding: .5em;
    background-color: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.217111);
    border-radius: 4px;

    @media screen and (min-width: 991px) {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      grid-column-gap: 20px;
      align-items: center;
      width: 80%;
      margin: 0 auto;
      margin-top: 10px;
    }
  }

  &_input-group {
    display: flex;
    align-items: center;
    color: var(--color-font-primary);
    margin-top: 10px;

    @media screen and (min-width: 991px) {
      align-items: center;
      margin-top: 0;
    }

    & > *:not(:first-child) {
      margin-left: 5px;
    }
  }

  &_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    width: 100%;

    @media screen and (min-width: 991px) {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1em;
      margin: 0 auto;
      margin-top: 20px;
      width: 80%;
    }
  }

  &_item {
    position: relative;
    display: grid;
    grid-template-rows: 140px 4em;
    padding: 3px;
    width: 100%;
    background-color: #FFFFFF;
    border: 1px solid #E4E4E4;
    box-sizing: border-box;
    box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.0527344);
    border-radius: 4px;

    @media screen and (min-width: 991px) {
      grid-template-rows: 220px 4em;
    }

    &-like {
      position: absolute;
      top: 140px;
      right: 0;
      padding: .7em;
      border-radius: 50%;
      background-color: #FFFFFF;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.163407);
      transform: translate(-20px, -50%);
      color: var(--color-font-primary);
      cursor: pointer;

      @media screen and (min-width: 991px) {
        top: 220px;
      }
    }

    &-poster {
      border-radius: 4px 4px 0px 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &_desc {
      padding: .5em;
    }

    &-title {
      font-family: 'Roboto', sans-serif;
      font-size: 15px;
    }

    &-price {
      margin-top: .5em;
      font-family: 'Roboto', sans-serif;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

</style>
