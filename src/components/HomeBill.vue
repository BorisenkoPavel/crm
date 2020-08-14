<template lang="pug">
  .col.s12.m6.l4
    .card.light-blue.bill-card
      .card-content.white-text
        span.card-title {{'BillInCurrency' | localize}}
        p.currency-line(v-for="cur of currencies" :key="cur")
          span {{getCurrency(cur) | currency(cur)}}
</template>

<script>
  export default {
      data() {
          return {
              currencies: ['RUB', 'USD', 'EUR']
          }
      },
      computed: {
          bill() {
              return this.$store.getters.info.bill
          },
          base() {
              return this.bill / (this.rates['RUB'] / this.rates['EUR'])
          }
      },
      props: ['rates'],
      methods: {
          getCurrency(currency) {
              return Math.floor(this.base * this.rates[currency])
          }
      }
  }
</script>
