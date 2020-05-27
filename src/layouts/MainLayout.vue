<template lang="pug">
  .app-main-layout
    nav-list(@click="isOpen = !isOpen")
    side-bar(v-model="isOpen")
    main.app-content(:class="{full : !isOpen}")
      .app-page
        router-view
    .fixed-action-btn
      a.btn-floating.btn-large.blue(href='#')
        i.large.material-icons add
</template>

<script>
import NavList from "@/components/app/nav-list";
import SideBar from "@/components/app/side-bar";

export default {
	name: "main-layout",
	data: () => ({
		isOpen: true,
	}),
	components: {
		NavList,
		SideBar,
	},
};
</script>
