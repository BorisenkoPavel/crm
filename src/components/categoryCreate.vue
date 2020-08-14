<template lang="pug">
  .col.s12.m6
    div
      .page-subtitle
        h4 {{'Create' | localize}}
      form(@submit.prevent="submitHandler")
        .input-field
          input#name(type='text' v-model="title" :class="{invalid:$v.title.$dirty && !$v.title.required}")
          label(for='name') {{'Title' | localize}}
          span.helper-text.invalid(v-if="$v.title.$dirty && !$v.title.required") {{'Message_CategoryTitle' | localize}}
        .input-field
          input#limit(type='number' v-model.number="limit" :class="{invalid:($v.limit.$dirty && !$v.limit.minValue)}")
          label(for='limit') {{'Limit' | localize}}
          span.helper-text.invalid(v-if="$v.limit.$dirty && !$v.limit.minValue") {{'Message_MinLength' | localize}} {{$v.limit.$params.minValue.min}}
        button.btn.waves-effect.waves-light(type='submit')
          | {{'Create' | localize}}
          i.material-icons.right send


</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    export default {
        name: "categoryCreate",
        data() {
            return {
                title: '',
                limit: 100
            }
        },
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        mounted() {
            M.updateTextFields()
        },
        methods: {
            updateSelectField() {
                this.$nextTick( () => {
                    this.select.destroy();
                    this.select = M.FormSelect.init(this.$refs.select);
                })
            },
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                try {
                    const category = await this.$store.dispatch('createCategory', {
                        title: this.title,
                        limit: this.limit
                    })
                    this.$message(`Категория "${this.title}" была создана`)
                    this.title = ''
                    this.limit = 100
                    this.$emit('created', category)
                    this.$v.reset()
                } catch (e) {}
            }
        }
    }
</script>

<style scoped>

</style>
