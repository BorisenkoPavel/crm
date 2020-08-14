<template lang="pug">
  div
    .page-title
      h3 {{'Menu_Planning' | localize}}
      h4 {{info.bill | currency('RUB')}}
    loader(v-if="loading")
    p.center(v-else-if="!categories.length") {{'NoCategories' | localize}}
      router-link(to="/categories")  {{'AddFirst' | localize}}
    section(v-else)
      div(v-for="cat of categories" :key="cat.id")
        p
          strong {{cat.title}}:
          |  {{cat.spend | currency}} {{'Of' | localize}} {{cat.limit | currency}}
        .progress(v-tooltip="cat.tooltip")
          .determinate(:style='{width: `${cat.progressPercent}%`}' :class="[cat.progressColor]")
</template>

<script>
  import {mapGetters} from 'vuex'
  import currencyFilter from '@/filters/currency.filter'
  import localizeFilter from '@/filters/localize.filter'

  export default {
      metaInfo() {
          return {
              title: this.$title('Menu_Planning')
          }
      },
      name: 'planning',
      data: () => ({
          loading: true,
          categories: []
      }),
      computed: {
          ...mapGetters(['info'])
      },
      async mounted() {
          const records = await this.$store.dispatch('fetchRecords')
          const categories = await this.$store.dispatch('fetchCategories')
          this.categories = categories.map(cat => {
              const spend = records
                .filter(r => r.categoryId === cat.id)
                .filter(r => r.type === 'outcome')
                .reduce((total, record) => {
                   return total += +record.amount
                },  0)
              const percent = 100 * spend / cat.limit
              const progressPercent = percent > 100 ? 100 : percent
              const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

              const tooltipValue = cat.limit - spend
              const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`
              return {
                  ...cat,
                  progressPercent,
                  progressColor,
                  spend,
                  tooltip
              }
          })
          this.loading = false
      }
  }
</script>
