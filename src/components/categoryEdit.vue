<template lang="pug">
  .col.s12.m6
    div
      .page-subtitle
        h4 {{'Edit' | localize}}
      form(@submit.prevent="submitHandler")
        .input-field
          select(ref="select" v-model="current")
            option(v-for="category in categories" :value="category.id" :key="category.id") {{category.title}}
          label {{'SelectCategory' | localize}}
        .input-field
          input#name(type='text' v-model="title" :class="{invalid:$v.title.$dirty && !$v.title.required}")
          label(for='name') {{'Title' | localize}}
          span.helper-text.invalid(v-if="$v.title.$dirty && !$v.title.required") {{'Message_CategoryTitle' | localize}}
        .input-field
          input#limit(type='number' v-model.number="limit" :class="{invalid:($v.limit.$dirty && !$v.limit.minValue)}")
          label(for='limit') {{'Limit' | localize}}
          span.helper-text.invalid(v-if="$v.limit.$dirty && !$v.limit.minValue") {{'Message_MinLength' | localize}} {{$v.limit.$params.minValue.min}}
        button.btn.waves-effect.waves-light(type='submit')
          | {{'Update' | localize}}
          i.material-icons.right send
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    import localizeFilter from '@/filters/localize.filter'

    export default {
        name: "categoryEdit",
        data: () => ({
            select: null,
            title: '',
            limit: '',
            current: null
        }),
        props: {
            categories: Array,
        },
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.$store.dispatch('updateCategory', categoryData)
                    this.$message(`${localizeFilter('Category')} "${this.title}" ${localizeFilter('Category_HasBeenUpdated')}`)
                    this.$emit('updated', categoryData)
                } catch (e) {}
            }
        },
        watch: {
          current (catId) {
              const {title, limit} = this.categories.find(c => c.id === catId)
              this.limit = limit
              this.title = title
          }
        },
        created() {
            const {title, limit, id} = this.categories[0]
            this.current = id
            this.title = title
            this.limit = limit
        },
        mounted() {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        },
        destroyed() {
            if(this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

<style scoped>

</style>
