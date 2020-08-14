<template lang="pug">
  div#app
    component(:is='layout')
      router-view
</template>

<script>
  import MainLayout from '@/layouts/MainLayout.vue'
  import EmptyLayout from '@/layouts/EmptyLayout.vue'

  export default {
      computed: {
        layout() {
            return (this.$route.meta.layout || "empty") + '-layout'
        }
      },
      components: {
          EmptyLayout,
          MainLayout
      }
  }
</script>

<style lang="sass">
  @import "~materialize-css/dist/css/materialize.min.css"
  @import "assets/index.css"
</style>
