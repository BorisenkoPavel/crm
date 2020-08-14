<template lang="pug">
  div
    .page-title
      h3 {{'profileTitle' | localize}}
    form.form(@submit.prevent="submitHandler")
      .input-field
        input#description.validate(type='text' v-model.trim='name' :class="{invalid: ($v.name.$dirty && $v.name.required)}")
        label(for='description') {{'Name' | localize}}
        span.helper-text.invalid(v-if="$v.name.$dirty && $v.name.required") {{'Message_EnterName' | localize}}
      .switch
        label
          | English
          input(type="checkbox" v-model="isRuLocale")
          span.lever
          | Русский
      button.btn.waves-effect.waves-light(type='submit')
        | {{'Update' | localize}}
        i.material-icons.right send
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { required } from "vuelidate/lib/validators";
  import localizeFilter from '@/filters/localize.filter'

  export default {
      metaInfo() {
          return {
              title: this.$title('ProfileTitle')
          }
      },
      data: () => ({
          name: '',
          isRuLocale: true
      }),
      computed: {
          ...mapGetters(['info'])
      },
      validations: {
          name: {required}
      },
      mounted() {
          this.name = this.info.name
          this.$nextTick(() => {
              M.updateTextFields()
              this.isRuLocale = this.info.locale === 'ru-RU' ? true : false
          })

      },
      methods: {
          ...mapActions(['updateInfo']),
          async submitHandler() {
              if (this.$v.$invalid) {
                  this.$v.$touch()
                  return
              }
              try {
                  await this.updateInfo({
                      name: this.name,
                      locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                  })
              } catch (e) {}
          }
      }
  }
</script>

<style lang="sass">
  .switch
    margin-bottom: 25px
</style>
