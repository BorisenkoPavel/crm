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
export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" }
    ]
  })
};
</script>
