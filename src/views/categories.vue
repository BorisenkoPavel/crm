<template lang="pug">
  div
    .page-title
      h3 {{'Categories' | localize}}
    section
      loader(v-if="loading")
      .row(v-else)
        categoryCreate(@created="addNewCategory")
        categoryEdit(:categories="categories" @updated="updateCategories" :key="categories.length+updateCount" v-if="categories.length")
        p.center(v-else) {{'NoCategories' | localize}}
          router-link(to="/categories")  {{'AddFirst' | localize}}
</template>

<script>
  import categoryCreate from '@/components/categoryCreate'
  import categoryEdit from '@/components/categoryEdit'

  export default {
      metaInfo() {
          return {
              title: this.$title('Category')
          }
      },
      data: () => ({
          categories: [],
          loading: true,
          updateCount: 0
      }),
      components: {
          categoryEdit,
          categoryCreate
      },
      async mounted() {
          this.categories = await this.$store.dispatch('fetchCategories')
          this.loading = false
      },
      methods: {
          addNewCategory(category) {
              this.categories.push(category)
          },
          updateCategories(category) {
              const idx = this.categories.findIndex(c => c.id === category.id)
              this.categories[idx].title = category.title
              this.categories[idx].limit = category.limit
              this.updateCount++
              // this.categories = await this.$store.dispatch('fetchCategories')
          }
      },
      destroyed() {
          if(this.select && this.select.destroy) {
              this.select.destroy()
          }
      }
  }
</script>
