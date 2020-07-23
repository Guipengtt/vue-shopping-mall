import Vue from "vue"
import Vuerouter from "vue-router"

const Home = () => import("../views/home/Home.vue");
const Category = () => import("../views/category/Category.vue");
const ShopeCart = () => import("../views/shopcart/ShopeCart.vue");
const Profile = () => import("../views/profile/Profile.vue");
const Detail = () => import("../views/details/Detail.vue")


Vue.use(Vuerouter);

const routes = [{
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/shopcart",
    component: ShopeCart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  }
];

const router = new Vuerouter({
  routes,
  mode: "history",
})

export default router;
