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
				small.helper-text.invalid(v-else-if="$v.email.$dirty && !$v.password.minLength") Пароль не может быть меньше {{$v.password.$params.minLength.min}} символов, сейчас {{password.length}}
		.card-action
			div
				button.btn.waves-effect.waves-light.auth-submit(type='submit')
					| Войти
					i.material-icons.right send
			p.center
				| Нет аккаунта?
				router-link(to="/register")  Зарегистрироваться
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'
  import messages from "@/utils/messages";

  export default {
      metaInfo() {
          return {
              title: this.$title('Login')
          }
      },
      name: 'login',
      data() {
          return {
              email: '',
              password: '',
              name: '',
          }
      },
      validations: {
          email: {email, required},
          password: {required, minLength: minLength(8)}
      },
      methods: {
          async submitHandler() {
              if (this.$v.$invalid) {
                  this.$v.$touch()
                  return
              }
              const formData = {
                  email: this.email,
                  password: this.password
              }
              try {
                  await this.$store.dispatch('login', formData)
                  this.$router.push('/')
              } catch (e) {}
          }
      },
      mounted() {
          if (messages[this.$route.query.message]) {
              this.$message(messages[this.$route.query.message])
          }
      }
  }
</script>


