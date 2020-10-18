import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue';
import firebase from "firebase";

Vue.use(VueRouter)

let router = new VueRouter({
  routes :[
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
      meta:{
        requiresGuest:true
      }
      
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      meta:{
        requiresGuest:true
      }
     
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import(/* webpackChunkName: "about" */ '../views/Team.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/editProject/:id',
      name: 'EditProject',
      component: () => import(/* webpackChunkName: "about" */ '../views/EditProject.vue'),
      meta:{
        requiresAuth:true
      }
    },
    
  ]
});

router.beforeEach((to,from,next)=>{
  // check for require Auth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
      // check if not loggedin
    if(!firebase.auth().currentUser){
      //goto login
      next({
        path:'/login',
        query:{
          redirect:to.fullpath
        }
      })
    } else{
      // proceed to route
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
      // check if  loggedin
    if(firebase.auth().currentUser){
      //goto dashboard
      next({
        path:'/',
        query:{
          redirect:to.fullpath
        }
      })
    } else{
      // proceed to route
      next();
    }
  }
  else{
    //proceed to route
     next();
  }

})

export default router;
