import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Axios from "axios";
import VueAxios from "vue-axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Create from "./components/Create.vue"
import Edit from "./components/Edit.vue";
import Index from "./components/Index.vue";

Vue.use(VueRouter);
Vue.use(Axios, VueAxios);

Vue.config.productionTip = false;

const routes = [
  {
    name: "Create",
    path: "/create",
    component: Create,
  },

  {
    name: "Edit",
    path: "/edit",
    component: Edit,
  },
  {
    name: "Index",
    path: "/index",
    component: Index,
  },
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
