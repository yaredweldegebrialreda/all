import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import firebase from "firebase";
import "./fb";
import EditProject from "./views/EditProject";

Vue.config.productionTip = false

Vue.component('edit-project',EditProject);


let app;
firebase.auth().onAuthStateChanged(user=>{
  console.log(user);
  if(!app){
    app=new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})


