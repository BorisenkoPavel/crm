<template lang="pug">
  loader(v-if="loading")
  .app-main-layout(v-else)
    nav-list(@click="isOpen = !isOpen")
    side-bar(v-model="isOpen" :key="info.locale")
    main.app-content(:class="{full : !isOpen}")
      .app-page
        router-view
    .fixed-action-btn
      router-link.btn-floating.btn-large.blue(to="/record" data-position="left" v-tooltip="createNewRecord")
        i.large.material-icons add
</template>

<script>
import NavList from "@/components/app/nav-list";
import SideBar from "@/components/app/side-bar";
import messages from "@/utils/messages";
import localizeFilter from '@/filters/localize.filter'
import { mapGetters } from 'vuex'

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  components: {
    NavList,
    SideBar
  },
  computed: {
      ...mapGetters(["info"]),
      createNewRecord() {
          return localizeFilter('CreateNewRecord')
      },
      error() {
          return this.$store.getters.error
      }
  },
  watch: {
      error(fbError) {
          this.$error(messages[fbError.code] || localizeFilter('SomethingWentWrong'))
      },
      createNewRecord(changeLocale) {
          console.log(22)
      }
  },
  async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
          await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
  }
};
</script>
