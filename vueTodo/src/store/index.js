import Vue from 'vue';
import Vuex from 'vuex';
import projects  from "./modules/projects";
import user from './modules/user';

// Load Vuex
Vue.use(Vuex)

// Create Store
export default new Vuex.Store({
   modules:{
     user,
     projects
   }
})




