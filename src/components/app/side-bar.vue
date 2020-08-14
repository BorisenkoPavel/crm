<template lang="pug">
	ul.sidenav.app-sidenav(:class="{open : value}")
		router-link(
				v-for='item in links'
				:key='item.url'
				tag='li'
				active-class='active'
				:to='item.url'
				:exact="item.exact"
			)
			a.waves-orange.pointer {{item.title}}
</template>

<script>
    import localizeFilter from '@/filters/localize.filter'
    export default {
        props: ["value"],
            data: () => ({
                links: [
                  { title: localizeFilter("Menu_Bill"), url: "/", exact: true },
                  { title: localizeFilter("Menu_History"), url: "/history" },
                  { title: localizeFilter("Menu_Planning"), url: "/planning" },
                  { title: localizeFilter("Menu_Record"), url: "/record" },
                  { title: localizeFilter("Menu_Category"), url: "/categories" }
                ],
            }),
    };
</script>
