import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home"
import firebase from 'firebase/app'
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("@/views/register.vue")
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/home.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/categories.vue")
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/detail.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/history.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/planning.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/profile.vue")
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: "true" },
    component: () => import("@/views/record.vue")
  }
]

});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if(requireAuth && !currentUser) {
    next('/login?message=log')
  } else {
    next()
  }
})

export default router;
