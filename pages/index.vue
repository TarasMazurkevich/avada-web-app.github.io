<template>
  <div class="container">
    <nuxt-link to="/voucher/add">
      + Add
    </nuxt-link>
    <div>
      <input v-model.trim="searchForm.name" type="text">
      <input v-model.trim="searchForm.location" type="text">
      <input type="button" value="Search" @click="searchVoucher">
    </div>
    <div>
      <select v-model.trim="filterForm.category" name="category" @change="filterVouchers">
        <option value="all" selected="selected">
          All
        </option>
        <option value="fire">
          Fire voucher
        </option>
        <option value="water">
          Water voucher
        </option>
      </select>
      <input v-model.trim.number="filterForm.fromPrice" type="number" @input="filterVouchers">
      <input v-model.trim.number="filterForm.toPrice" type="number" @input="filterVouchers">
    </div>
    <ul>
      <li v-for="(voucher, i) in FILTERED_VOUCHERS" :key="i">
        {{ voucher.title }}, {{ voucher.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
  computed: {
    ...mapGetters(['VOUCHERS', 'FILTERED_VOUCHERS'])
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
    }
  }
}
</script>

<style>

</style>
