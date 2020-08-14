<template lang="pug">
  div
    .page-title
      h3 Счет
      button.btn.waves-effect.waves-light.btn-small(@click='refresh')
        i.material-icons refresh
    loader(v-if="loading")
    .row(v-else)
      HomeBill(:rates="currency.rates")
      HomeCurrency(:rates="currency.rates", :date="currency.date")
</template>

<script>
  import HomeBill from '@/components/HomeBill.vue'
  import HomeCurrency from '@/components/HomeCurrency.vue'

  export default {
      metaInfo() {
          return {
              title: this.$title('Bill')
          }
      },
      name: 'Home',
      data () {
          return {
              loading: true,
              currency: null
          }
      },
      components: {
          HomeBill,
          HomeCurrency
      },
      async mounted() {
        this.currency = await this.$store.dispatch("fetchCurrency")
        this.loading = false
      },
      methods: {
         async refresh() {
           this.loading = true
           this.currency = await this.$store.dispatch("fetchCurrency")
           this.loading = false
         }
      }
  }
</script>
