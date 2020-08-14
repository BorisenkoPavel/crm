<template lang="pug">
  table
    thead
      tr
        th #
        th {{'Amount' | localize}}
        th {{'Date' | localize}}
        th {{'Category' | localize}}
        th {{'Type' | localize}}
        th {{'Open' | localize}}
    tbody
      tr(v-for="(r, key) in records" :key="key")
        td {{key+1}}
        td {{r.amount | currency('RUB')}}
        td {{r.date | date('date')}}
        td {{r.categoryName}}
        td
          span.white-text.badge(:class="r.typeClass") {{r.typeText}}
        td
          button.btn-small.btn(@click="$router.push('/detail/'+r.id)" v-tooltip="openRecord")
            i.material-icons open_in_new
</template>

<script>
  import localizeFilter from '@/filters/localize.filter'

  export default {
          name: "history-table",
          data: () => ({
          }),
          props: {
            records: {
                required: true,
                type: Array
            }
          },
      computed: {
        openRecord() {
           return localizeFilter('OpenRecord')
        }
      }
    }
</script>
