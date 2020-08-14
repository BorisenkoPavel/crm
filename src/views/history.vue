<template lang="pug">
  div
    .page-title
      h3 {{'History_Title' | localize}}
    .history-chart
      canvas(ref="canvas")
    loader(v-if="loading")
    p.center(v-else-if="!records.length") {{'NoRecords' | localize}}.
      router-link(to="/records") {{'AddFirst' | localize}} Добавить первую
    section(v-else)
      history-table(:records="items")
      paginate(
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'")
</template>

<script>
  import historyTable from '@/components/history-table'
  import pagination from '@/mixins/pagination.mixin'
  import { Pie } from 'vue-chartjs'
  import localizeFilter from '@/filters/localize.filter'

  export default {
      metaInfo() {
          return {
              title: this.$title('Menu_History')
          }
      },
      data: () => ({
          loading: true,
          records: []
      }),
      extends: Pie,
      name: 'history',
      mixins: [pagination],
      components: {
          historyTable
      },
      async mounted() {
          this.records = await this.$store.dispatch('fetchRecords')
          const categories = await this.$store.dispatch('fetchCategories')
          this.setup(categories)
          this.loading = false
      },
      methods: {
          setup (categories) {
              this.setupPugination(this.records.map(r => {
                  return {
                      ...r,
                      categoryName: categories.find(c => c.id === r.categoryId).title,
                      typeClass: r.type === 'income' ? 'green' : 'red',
                      typeText: r.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
                  }
              }))
              this.renderChart({
                  labels: categories.map(c => c.title),
                  datasets: [{
                      label: localizeFilter('CostsForCategories'),
                      data: categories.map(c => {
                          return this.records.reduce((total, r) => {
                              if(r.categoryId === c.id && r.type === 'outcome') {
                              total +=  r.amount
                          }
                              return total
                          }, 0)
                      }),
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              })
          }
      }
  }
</script>
