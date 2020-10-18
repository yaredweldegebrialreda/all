import firebase from "firebase";

   const state={
      loading : false,
      error:"", 
      newUser:""
    };


   const mutations={
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      console.log("inside setError:",payload.message);
      state.error = payload.message
    },
    clearError (state) {
      state.error = null
    },
    onRegisterUserSuccess(state,payload){
      state.newUser=payload;
      console.log("registered user:",state.newUser);
    },
    onLoginUserSuccess(state,payload){
      console.log("check login result payload::",payload);
      state.newUser=payload;
      // this.$router.go({path:this.$router.path})
    },
    onsignOut(state){
      console.log("check onsignout",state);
     state.newUser=undefined; 
     console.log("check onsignout",state);
    }

    };

   const actions={
      registerUser({commit},formData){
        commit('setLoading',true)
        commit('clearError')
        console.log("Submitting your register form:",formData.email,formData.password);
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            formData.email,
            formData.password
          )
          .then(user => {
              console.log("registered user:",user);
            // this.$router.push("/");  // this leads to reload to see the change in navbar
            commit('onRegisterUserSuccess',user);
            commit('setLoading',false);
          
           
          })
          .catch(error => {
            console.log(error);
           // commit('onRegisterUserError');
            commit('setLoading',false);
            commit('setError',error);
             
          });
      },
     signInUser({commit},loginData){
      commit('setLoading',true);
      commit('clearError')
      console.log("Submitting your Login form:",loginData.email,loginData.password);
      firebase
          .auth()
          .signInWithEmailAndPassword(
            loginData.email,
            loginData.password
          )
          .then(user => { 
            commit('onLoginUserSuccess',user);
            commit('setLoading',false);
           
            
          })
          .catch(error => {
            commit('setLoading',false);
            commit('setError',error);
           console.log(error.message);
          });
     },
     handleSignout({commit}){
      firebase
      .auth()
      .signOut()
      .then(() => {
        //  this.$router.push('/login') // this leads to reload to see the change in navbar
        commit('onsignOut')
      });
     }
    };

    const getters={
        loading (state) {
          return state.loading
        },
        error (state) {
          return state.error
        },
      user(){
        return state.newUser
      }
    };
   

    export default {actions,mutations,getters,state}
  
  