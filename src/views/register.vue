<template lang="pug">
  form.card.auth-card(@submit.prevent="submitHandler")
    .card-content
      span.card-title Домашняя бухгалтерия
      .input-field
        input#email.validate(type='text' v-model.trim='email' :class="{invalid:($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}")
        label(for='email') Email
        small.helper-text.invalid(v-if="($v.email.$dirty && !$v.email.required)") Поле Email не должно быть пустым
        small.helper-text.invalid(v-else-if="($v.email.$dirty && !$v.email.email)") Введите корректный Email
      .input-field
        input#password.validate(type='password' v-model.trim='password' :class="{invalid: ($v.password.$dirty && !email.required) || ($v.password.$dirty && $v.password.minLength)}")
        label(for='password') Пароль
        small.helper-text.invalid(v-if="$v.email.$dirty && !$v.password.required") Введите пароль
        small.helper-text.invalid(v-else-if="!$v.password.minLength") Пароль не может быть меньше {{$v.password.$params.minLength.min}} символов, сейчас {{password.length}}
      .input-field
        input#name.validate(type='text' v-model.trim='name' :class="{invalid: ($v.name.$dirty && $v.name.required)}")
        label(for="name")
        small.helper-text.invalid(v-if="$v.name.$dirty && !$v.name.required") Введите имя
      p
        label
          input(type='checkbox' v-model="agree")
          span С правилами согласен
    .card-action
      div
        button.btn.waves-effect.waves-light.auth-submit(type='submit')
          | Зарегистрироваться
          i.material-icons.right send
      p.center
        | Уже есть аккаунт?
        router-link(to="/login")  Войти!
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'

  export default {
      metaInfo() {
          return {
              title: this.$title('Register_Page')
          }
      },
      name: 'register',
      data() {
          return {
              email: '',
              password: '',
              name: '',
              agree: false
          }
      },
      validations: {
          email: {email, required},
          password: {required, minLength: minLength(8)},
          name: {required},
          agree: {checked: v => v}
      },
      methods: {
          async submitHandler() {
              if (this.$v.$invalid) {
                  this.$v.$touch()
                  return
              }
              const formData = {
                  email: this.email,
                  password: this.password,
                  name: this.name
              }
              try {
                  await this.$store.dispatch('register', formData)
                  this.$router.push('/')
              } catch (e) {
              }
          }
      }
  }
</script>
