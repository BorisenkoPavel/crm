<template>
	<div id="app">
		<component :is="layout"> </component>
	</div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
console.log(Object.is(2, 2));
export default {
	computed: {
		layout() {
			return (this.$route.meta.layout || "empty") + "-layout"; //не совсем понятно
		},
	},
	components: {
		EmptyLayout,
		MainLayout,
	},
};
</script>

<style lang="sass">
@import "~materialize-css/dist/css/materialize.min.css"
@import "assets/index.css"
</style>
