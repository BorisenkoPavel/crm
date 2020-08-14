<template lang="pug">
  div
    .page-title
      h3 {{'Menu_NewRecord' | localize}}
    loader(v-if="loading")
    p.ceter(v-else-if="!categories.length") {{'NoCategories' | localize}}
      router-link(to="/categories")  {{'AddFirst' | localize}}
    form.form(v-else @submit.prevent="submitHandler")
      .input-field
        select(ref="select" v-model="current")
          option(v-for="category in categories" :value="category.id" :key="category.id") {{category.title}}
        label {{'SelectCategory' | localize}}
      p
        label
          input.with-gap(name='type', type='radio', value='income' v-model="type")
          span {{'Income' | localize}}
      p
        label
          input.with-gap(name='type', type='radio', value='outcome' v-model="type")
          span {{'Outcome' | localize}}
      .input-field
        input#amount(type='number' v-model.number='amount' :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)}")
        label(for='amount') {{'Amount' | localize}}
        span.helper-text.invalid(v-if="$v.amount.$dirty && !$v.amount.minValue") {{'EnterSum' | localize}}
      .input-field
        input#description(type='text'  v-model='description' :class="{invalid: ($v.description.$dirty && !$v.description.required)}")
        label(for='description') {{'Description' | localize}}
        span.helper-text.invalid(v-if="$v.description.$dirty && !$v.description.required") {{'Message_EnterDescription' | localize}}
      button.btn.waves-effect.waves-light(type='submit')
        | {{'Create' | localize}}
        i.material-icons.right send
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators'
  import {mapGetters} from 'vuex'
  import localizeFilter from '@/filters/localize.filter'
  export default {
      metaInfo() {
          return {
              title: this.$title('Menu_NewRecord')
          }
      },
      name: 'record',
        data: () => ({
          categories: [],
          select: null,
          current: null,
          loading: true,
          description: '',
          amount: 1,
          type: 'outcome'
        }),
      validations: {
        description: {required},
        amount: {minValue: minValue(1)}
      },
      async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false
        if(this.categories.length) {
          this.current = this.categories[0].id
        }
        await this.$nextTick()
        M.updateTextFields()
        this.select = M.FormSelect.init(this.$refs.select);
      },
      methods: {
          async submitHandler() {
              if(this.$v.$invalid) {
                  this.$v.$touch()
                  return
              }
              if(this.canCreatedRecord) {
                  try {
                      await this.$store.dispatch('createRecord', {
                          categoryId: this.current,
                          amount: this.amount,
                          description: this.description,
                          type: this.type,
                          date: new Date().toJSON()
                      })
                      const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
                      await this.$store.dispatch('updateInfo', {bill})
                      this.$message(localizeFilter('RecordHasBeenCreated'))
                      this.$v.reset()
                      this.amount = 1
                      this.description = ''
                  } catch {}
              } else {
                  this.$message(`${localizeFilter('NotEnoughMoney')} ${this.amount-this.info.bill}`)
              }
          }
      },
      computed: {
          ...mapGetters(['info']),
          canCreatedRecord() {
              if(this.type === 'income') {
                  return true
              }
              return Number(this.info.bill) >= this.amount
          }
      }
  }
</script>
