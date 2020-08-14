import Vue from 'vue'
import Vuelidate from "vuelidate"
import Paginate from 'vuejs-paginate'
import firebase from 'firebase/app'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from './directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import Loader from '@/components/app/loader'
import 'materialize-css/dist/js/materialize.min'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDkwM82v8mT9xpf2XQQminbJLxBWJYEIgk",
  authDomain: "vue-crm-a6418.firebaseapp.com",
  databaseURL: "https://vue-crm-a6418.firebaseio.com",
  projectId: "vue-crm-a6418",
  storageBucket: "vue-crm-a6418.appspot.com",
  messagingSenderId: "959275853671",
  appId: "1:959275853671:web:5579239411570a629cf1c2",
  measurementId: "G-SNMW8ZKR1N"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
