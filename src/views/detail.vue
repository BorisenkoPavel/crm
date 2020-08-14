<template lang="pug">
  loader(v-if="loading")
  div(v-else-if="record")
    .breadcrumb-wrap
      router-link.breadcrumb(to='/history') {{'Menu_History' | localize}}
      a(@click.prevent).breadcrumb
        | {{record.type === 'income' ? income : outcome}}
    .row
      .col.s12.m6
        .card(:class="record.type === 'income' ? 'green' : 'red'")
          .card-content.white-text
            p {{'Description' | localize}}: {{record.description}}
            p {{'Amount' | localize}}: {{record.amount | currency}}
            p {{'Category' | localize}}: {{record.categoryName}}
            small {{record.date | date('datetime')}}
  p.center(v-else) {{'NoRecordId' | localize}}=<strong>{{$route.params.id}}</strong> {{'NotFound' | localize}}
</template>

<script>
  import localizeFilter from '@/filters/localize.filter'
  export default {
      metaInfo() {
          return {
              title: this.$title('ProfileTitle')
          }
      },
      name: 'detail',
      data: () => ({
          record: null,
          loading: true
      }),
      computed: {
          income() {
              return localizeFilter('Income')
          },
          outcome() {
              return localizeFilter('Outcome')
          }
      },
      async mounted() {
          const id = this.$route.params.id
          const record = await this.$store.dispatch('fetchRecordById', id)
          const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
          this.record = {
              ...record,
              categoryName: category.title
          }
          this.loading = false
      }
  }
</script>
