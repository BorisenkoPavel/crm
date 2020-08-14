<template lang="pug">
  .col.s12.m6.l8
    .card.orange.darken-3.bill-card
      .card-content.white-text
        .card-header
          span.card-title {{'CurrencyAmountTitle' | localize}}
        table
          thead
            tr
              th {{'Currency' | localize}}
              th {{'CurrencyType' | localize}}
              th {{'Date' | localize}}
          tbody
            tr(v-for='cur in currencies' :key="cur")
              td {{cur}}
              td {{rates[cur].toFixed(3)}}
              td {{date | date('date')}}
</template>

<script>
  export default {
      data() {
          return {
              currencies: ['RUB', 'USD', 'EUR']
          }
      },
      props: ['rates', 'date']
  }
</script>

